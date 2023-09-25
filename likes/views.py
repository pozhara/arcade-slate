from rest_framework import generics, permissions
from drf_api.permissions import IsOwnerOrReadOnly
from likes.models import ReviewLike, DealLike
from likes.serializers import ReviewLikeSerializer, DealLikeSerializer


class ReviewLikeList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = ReviewLikeSerializer
    queryset = ReviewLike.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ReviewLikeDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = ReviewLikeSerializer
    queryset = ReviewLike.objects.all()


class DealLikeList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = DealLikeSerializer
    queryset = DealLike.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class DealLikeDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = DealLikeSerializer
    queryset = DealLike.objects.all()
