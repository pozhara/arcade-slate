from django.db import models
from django.contrib.auth.models import User

CATEGORY = [
    ('Percentage discount', 'Percentage discount'),
    ('Pounds off', 'Pounds off'),
    ('Buy One Get One', 'Buy One Get One'),
    ('Multi-buy', 'Multi-buy'),
    ('Free shipping', 'Free shipping'),
    ('Try before you buy', 'Try before you buy'),
    ('Gift with purchase', 'Gift with purchase'),
    ('Other', 'Other')
]


class BestDeals(models.Model):
    """
    Best deals model, related to 'owner', i.e. a User instance.
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    category = models.CharField(max_length=100, choices=CATEGORY)
    image = models.ImageField(
        upload_to='images/', blank=True
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
