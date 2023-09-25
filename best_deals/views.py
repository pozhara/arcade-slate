from rest_framework import generics, permissions
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
    queryset = BestDeals.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BestDealsDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = BestDealsSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = BestDeals.objects.all()
