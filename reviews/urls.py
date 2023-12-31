from django.urls import path
from reviews import views

urlpatterns = [
    path('reviews/', views.ReviewList.as_view()),
    path('reviews/<int:pk>/', views.ReviewDetail.as_view()),
    path('liked/', views.LikedReviews.as_view()),
    path('reviews/<int:pk>/like', views.LikeReview.as_view()),
    path('reviews/<int:pk>/unlike', views.UnlikeReview.as_view()),
]
