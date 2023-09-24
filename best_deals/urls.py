from django.urls import path
from best_deals import views

urlpatterns = [
    path('deals/', views.BestDealsList.as_view()),
    path('deals/<int:pk>/', views.BestDealsDetail.as_view())
]
