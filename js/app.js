Vue.component('searchbar', {
    data () {
        return {
            criteria: null,
            apiKey: 'alQax0m0WH4PSot4je6T0EP7aUHjRqWD',
            limit: 10,
            gifs: [],
            dropdownOpen: false,
            selectedGif: ''
        }
    },
    template: `
        <div class="search-bar">
            <div class="input-group">
                <h1 class="text-center">Search Gifs</h1>
                <form @submit.prevent="getGifs"
                    <input type="text"
                    @keyup.enter="getGifs"
                    v-model="criteria"
                    placeholder="Search for GIFs"
                    />
                    <button class="button" @click="getGifs">Search</button>
                </form>
            </div>
            <div class="dropdown">
                <div class="dropdown-menu" :class="{ 'show' : dropdownOpen }">
                    <a
                        href="#"
                        v-for="gif in gifs"
                        class="dropdown-item"
                        @click="selectGif(gif.images)">

                        <img :src="gif.images.fixed_width.url" />
                    </a>
                </div>
            </div>
            <div v-show="selectedGif" class="card selectedGifPreview">

                <div class="card-body">
                    <img :src="selectedGif" />
                    <br />
                    <a href="#" class="btn btn-sm btn-danger" @click="selectedGif=''">x</a>

                </div>
            </div>
        </div>
    `,
    methods: {
        getGifs() {

            if(!this.criteria){
                return false;
            }
            console.log(this.critera);


            this.gifs = [],
            this.dropdownOpen = false;

            axios.get('https://api.giphy.com/v1/gifs/search?q=' + this.criteria + '&api_key=' + this.apiKey + '&limit=' + this.limit)
                .then((response) => {
                    this.loadGifs(response.data.data)
                    console.log(response);

                });
        },

        loadGifs(data) {
            this.gifs = data;

            this.dropdownOpen = true;
        },

        selectGif(gif) {

            console.log(gif);
            this.selectedGif = gif.fixed_height.url;

            this.dropdownOpen = false;
        },

        doFocus() {
            if(this.criteria) this.dropdownOpen = true;
        }
    }
})

var vue = new Vue ({
    el: '#app'
})
