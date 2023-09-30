from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Review
from .serializers import ReviewSerializer


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
