// app.js
document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('nexusData'));
    
    if (data) {
        document.getElementById('pub-name').innerText = data.profile.name;
        document.getElementById('pub-bio').innerText = data.profile.bio;
        document.getElementById('pub-photo').src = data.profile.photo;

        const container = document.getElementById('pub-links');
        container.innerHTML = data.links.map(l => `
            <a href="${l.url}" target="_blank" class="card-glass block w-full p-4 flex justify-between items-center hover:bg-white/10 transition-all">
                <div class="flex items-center gap-4">
                    <i class="${l.icon} text-purple-400 text-xl"></i>
                    <span class="font-medium">${l.label}</span>
                </div>
                <i class="fa-solid fa-chevron-right text-xs text-zinc-600"></i>
            </a>
        `).join('');
    }
});