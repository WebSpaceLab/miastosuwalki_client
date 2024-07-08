<template>
        <section class="google-reviews">
            <h2>Google Reviews</h2>
            
            <div class="reviews-list">
                <div v-for="review in reviews" :key="review.id" class="review">
                    <div class="review-rating">{{ review.rating }}/5</div>
                    <div class="review-content">{{ review.content }}</div>
                    <div class="review-author">{{ review.author }}</div>
                </div>
            </div>
        </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const reviews = ref([]);

        const fetchReviews = async () => {
            const placeId = 'YOUR_GOOGLE_PLACE_ID'; // replace with your Google Place ID
            const apiKey = 'YOUR_API_KEY'; // replace with your Google API Key
            const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
            // const url = `https://www.google.com/maps/place/Portal+Internetowy+Miasto+Suwa%C5%82ki/@54.0947954,22.9122306,17z/data=!3m1!4b1!4m6!3m5!1s0x46e103085d9d75cb:0x3acd05e76b677c4f!8m2!3d54.0947955!4d22.9171069!16s%2Fg%2F11ldvz5yg4?entry=ttu`;

            try {
                const response = await axios.get(url);
                if (response.data.result && response.data.result.reviews) {
                    reviews.value = response.data.result.reviews.map(review => ({
                        rating: review.rating,
                        content: review.text,
                        author: review.author_name,
                    }));
                }
            } catch (error) {
                console.error('Error fetching Google reviews:', error);
            }
        };

        onMounted(fetchReviews);

        return {
            reviews,
        };
    },
};
</script>

<style scoped>
.google-reviews {
        /* Add your styles here */
        display: flex;
        flex-direction: column;
        align-items: center;
}

.reviews-list {
        /* Add your styles here */
        margin-top: 20px;
}

.review {
        /* Add your styles here */
}
</style>