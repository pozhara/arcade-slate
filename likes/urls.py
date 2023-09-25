from django.urls import path
from likes import views

urlpatterns = [
    path('reviewlikes/', views.ReviewLikeList.as_view()),
    path('deal_likes/', views.DealLikeList.as_view()),
    path('reviewlikes/<int:pk>/', views.ReviewLikeDetail.as_view()),
    path('deal_likes/<int:pk>/', views.DealLikeDetail.as_view())
]
