from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from drf_api.permissions import IsOwnerOrReadOnly
from .models import ReviewComment, DealsComment
from .serializers import (
    CommentSerializer,
    CommentDetailSerializer,
    DealCommentSerializer,
    DealCommentDetailSerializer
    )


class ReviewCommentList(generics.ListCreateAPIView):
    """
    List comments or create a comment if logged in.
    """
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = ReviewComment.objects.all()
    filter_backends = [
        DjangoFilterBackend
    ]
    filterset_fields = [
        'review'
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ReviewCommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a comment, or update or delete it by id if you own it.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = CommentDetailSerializer
    queryset = ReviewComment.objects.all()


class DealsCommentList(generics.ListCreateAPIView):
    """
    List comments or create a comment if logged in.
    """
    serializer_class = DealCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = DealsComment.objects.all()
    filter_backends = [
        DjangoFilterBackend
    ]
    filterset_fields = [
        'deal'
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class DealsCommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a comment, or update or delete it by id if you own it.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = DealCommentDetailSerializer
    queryset = DealsComment.objects.all()
