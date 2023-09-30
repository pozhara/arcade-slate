from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_api.permissions import IsOwnerOrReadOnly
from .models import BestDeals
from .serializers import BestDealsSerializer


class BestDealsList(generics.ListCreateAPIView):
    """
    List posts or create a post if logged in
    The perform_create method associates the post with the logged in user.
    """
    serializer_class = BestDealsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = BestDeals.objects.annotate(
        deals_likes_count=Count('deal_likes', distinct=True),
        deals_comments_count=Count('dealscomment', distinct=True)
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner__followed__owner__profile',
        'deal_likes__owner__profile',
        'owner__profile'
    ]
    search_fields = [
        'owner__username',
        'title',
        'category'
    ]
    ordering_fields = [
        'deals_likes_count',
        'deals_comments_count',
        'deal_likes__created_at',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BestDealsDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = BestDealsSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = BestDeals.objects.annotate(
        deals_likes_count=Count('deal_likes', distinct=True),
        deals_comments_count=Count('dealscomment', distinct=True)
    ).order_by('-created_at')
