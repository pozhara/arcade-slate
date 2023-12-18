from django.db.models import Count
from rest_framework import generics, status, permissions, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Review
from likes.models import ReviewLike
from .serializers import ReviewSerializer
from django.shortcuts import get_object_or_404


class ReviewList(generics.ListCreateAPIView):
    """
    List posts or create a post if logged in
    The perform_create method associates the post with the logged in user.
    """
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Review.objects.annotate(
        review_likes_count=Count('review_likes', distinct=True),
        review_comments_count=Count('reviewcomment', distinct=True)
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner__followed__owner__profile',
        'review_likes__owner__profile',
        'owner__profile'
    ]
    search_fields = [
        'owner__username',
        'genre',
        'title',
        'level_of_difficulty',
        'stars',
        'suitable_age'
    ]
    ordering_fields = [
        'review_likes_count',
        'review_comments_count',
        'review_likes__created_at',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Review.objects.annotate(
        review_likes_count=Count('review_likes', distinct=True),
        review_comments_count=Count('reviewcomment', distinct=True)
    ).order_by('-created_at')


class LikedReviews(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Review.objects.filter(review_likes__owner=user).annotate(
            review_likes_count=Count('review_likes', distinct=True),
            review_comments_count=Count('reviewcomment', distinct=True)
        ).order_by('-created_at')

class LikeReview(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, format=None):
        review = get_object_or_404(Review, id=pk)
        ReviewLike.objects.create(owner=request.user, review=review)

        return Response(status=status.HTTP_200_OK)


class UnlikeReview(generics.RetrieveUpdateDestroyAPIView):
    def post(self, request, pk, format=None):
        review = get_object_or_404(Review, pk=pk)
        ReviewLike.objects.filter(owner=request.user, review=review).delete()

        return Response(status=status.HTTP_200_OK)
