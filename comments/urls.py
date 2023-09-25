from django.urls import path
from comments import views

urlpatterns = [
    path('review_comments/', views.ReviewCommentList.as_view()),
    path('review_comments/<int:pk>/', views.ReviewCommentDetail.as_view()),
    path('deals_comments/', views.DealsCommentList.as_view()),
    path('deals_comments/<int:pk>/', views.DealsCommentDetail.as_view())
]
