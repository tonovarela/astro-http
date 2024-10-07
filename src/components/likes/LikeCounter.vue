<template>
    <div v-if="isLoading">
        Loading....
    </div>
    <button ref="buttonRef" v-else-if="likeCount===0" @click="likePost">
        Like counter
    </button>
    <button ref="buttonRef" id="buttonClick" v-else @click="likePost">
        Likes 
        <span>
            {{likeCount}}
        </span>
    </button>

</template>

<script lang="ts" setup>
import {   ref, watch } from 'vue';
import  confetti from 'canvas-confetti';
import debounce from 'lodash/debounce';

interface Props {
    postId: string;
}
const props = defineProps<Props>();




const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(false);
const buttonRef = ref<HTMLElement | null>(null);

const debounceLike = debounce(()=> {
    console.log('debounce'+likeClicks.value);
     fetch(`/api/posts/likes/${props.postId}`,{
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({likes: likeClicks.value})
   })
   likeClicks.value = 0; 
},500);

watch(likeCount,debounceLike);
const likePost = () => {
    likeCount.value++;
    likeClicks.value++;    
    const {left , top} = buttonRef.value!.getBoundingClientRect();
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { 
            x: left / window.innerWidth +0.2 ,
            y: top / window.innerHeight
         }
    });
}



const getCurrentLikes = async () => {

    
    isLoading.value = true;
    try {
        const response = await fetch(`/api/posts/likes/${props.postId}`);
        const data = await response.json();
        likeCount.value = data.likes;                
    } catch (error) {
        console.log(error);
    }finally{
        isLoading.value  =false
    } 
}


getCurrentLikes();

</script>

<style scoped>
button {
    background-color: #5e51bc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background-color: #4a3f9a;
}
</style>