from rest_framework import serializers
from .models import Review
from likes.models import ReviewLike


class ReviewSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    review_like_id = serializers.SerializerMethodField()
    review_likes_count = serializers.ReadOnlyField()
    review_comments_count = serializers.ReadOnlyField()

    def validate_image(self, value):
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                'Image size larger tham 2MB!'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'Image width larger than 4096px!'
            )
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'Image height larger than 4096px!'
            )
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_review_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = ReviewLike.objects.filter(
                owner=user, review=obj
            ).first()
            return like.id if like else None
        return None

    class Meta:
        model = Review
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'title', 'content', 'stars', 'genre', 'developed_by',
            'level_of_difficulty', 'suitable_age', 'hours_spent', 'image',
            'review_like_id', 'review_likes_count', 'review_comments_count'
        ]
