from django.db import models
from django.contrib.auth.models import User

STARS = [
    ('1', 1),
    ('1.5', 1.5),
    ('2', 2),
    ('2.5', 2.5),
    ('3', 3),
    ('3.5', 3.5),
    ('4', 4),
    ('4.5', 4.5),
    ('5', 5)
]

GENRE = [
    ('Sandbox', 'Sandbox'),
    ('Real-time strategy', 'Real-time strategy'),
    ('Shooters', 'Shooters'),
    ('Multiplayer online battle arena', 'Multiplayer online battle arena'),
    ('Role-playing', 'Role-playing'),
    ('Simulation and sports', 'Simulation and sports'),
    ('Action adventure', 'Action adventure'),
    ('Survival', 'Survival'),
    ('Horror', 'Horror')
]

DIFFICULTY = [
    ('Easy', 'Easy'),
    ('Medium', 'Medium'),
    ('Hard', 'Hard'),
    ('Extreme', 'Extreme'),
    ('Nightmare', 'Nightmare')
]

AGE = [
    ('3', 3),
    ('7', 7),
    ('12', 12),
    ('16', 16),
    ('18', 18),
]


class Review(models.Model):
    """
    Review model, related to 'owner', i.e. a User instance.
    Default image set so that we can always reference image.url.
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    stars = models.CharField(max_length=3, choices=STARS)
    genre = models.CharField(max_length=100, choices=GENRE)
    developed_by = models.CharField(max_length=255)
    level_of_difficulty = models.CharField(max_length=50, choices=DIFFICULTY)
    suitable_age = models.CharField(max_length=15, choices=AGE)
    hours_spent = models.IntegerField(blank=True, null=True)
    image = models.ImageField(
        upload_to='images/', blank=True
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
