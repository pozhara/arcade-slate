from django.http import Http404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import BestDeals
from .serializers import BestDealsSerializer
from drf_api.permissions import IsOwnerOrReadOnly


class BestDealsList(APIView):
    serializer_class = BestDealsSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def get(self, request):
        deals = BestDeals.objects.all()
        serializer = BestDealsSerializer(
            deals, many=True, context={'request': request}
        )
        return Response(serializer.data)

    def post(self, request):
        serializer = BestDealsSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BestDealsDetail(APIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = BestDealsSerializer

    def get_object(self, pk):
        try:
            deal = BestDeals.objects.get(pk=pk)
            self.check_object_permissions(self.request, deal)
            return deal
        except BestDeals.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        deal = self.get_object(pk)
        serializer = BestDealsSerializer(
            deal, context={'request': request}
        )
        return Response(serializer.data)

    def put(self, request, pk):
        deal = self.get_object(pk)
        serializer = BestDealsSerializer(
            deal, data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        deal = self.get_object(pk)
        deal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
