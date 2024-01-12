import { defineStore } from "pinia"
import { ref } from "vue"

export const useDrawer = defineStore('drawer', () => {
    const drawer = ref(false)
    const toggleDrawer = () => {
        drawer.value = !drawer.value
    }
    
    return { drawer, toggleDrawer }
})
    