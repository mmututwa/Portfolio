class BlogManager {
    constructor() {
        this.posts = [];
        this.postsPerPage = 5;
        this.currentPage = 1;
    }

    async loadPosts() {
        try {
            const response = await fetch('/posts.json');
            const data = await response.json();
            this.posts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            return this.posts;
        } catch (error) {
            console.error('Error loading posts:', error);
            return [];
        }
    }

    renderPosts(container) {
        const start = (this.currentPage - 1) * this.postsPerPage;
        const end = start + this.postsPerPage;
        const paginatedPosts = this.posts.slice(start, end);

        container.innerHTML = paginatedPosts.map(post => `
            <div class="blog-post">
                <h3><a href="/posts/${post.id}">${post.title}</a></h3>
                <div class="post-meta">
                    <span class="date">${new Date(post.date).toLocaleDateString()}</span>
                    <span class="author">By ${post.author}</span>
                    <span class="category">${post.category}</span>
                </div>
                <p>${post.summary}</p>
                <div class="tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');

        this.renderPagination(container);
    }

    renderPagination(container) {
        const totalPages = Math.ceil(this.posts.length / this.postsPerPage);
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        pagination.innerHTML = `
            <button ${this.currentPage === 1 ? 'disabled' : ''} onclick="blogManager.prevPage()">Previous</button>
            <span>Page ${this.currentPage} of ${totalPages}</span>
            <button ${this.currentPage === totalPages ? 'disabled' : ''} onclick="blogManager.nextPage()">Next</button>
        `;
        container.appendChild(pagination);
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderPosts(document.getElementById('blog-container'));
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.posts.length / this.postsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.renderPosts(document.getElementById('blog-container'));
        }
    }
}