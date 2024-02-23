import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
export const useCountStore = defineStore("count", () => {
  const countState = reactive({
    count: 0,
    evenOdd: "",
  });

  const checkEvenOdd = computed(() => {
    return countState.count % 2 === 0 ?  "Even" : "Odd";
  });

  const increment = () => {
    countState.count++;
  };

  const decrement = () => {
    countState.count--;
  };

  return {
    countState,
    increment,
    decrement,

    checkEvenOdd,
  };
});
