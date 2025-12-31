// app.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('https://ynjfamqtftudexhzxmji.supabase.co', 'sb_publishable_LjoM3Afrgi3p7M6JUdrFlw_N5krieUT')

async function loadLinks() {
    // Busca o perfil
    const { data: profile } = await supabase.from('profile').select('*').single();
    if (profile) {
        document.getElementById('pub-name').innerText = profile.name;
        document.getElementById('pub-bio').innerText = profile.bio;
        document.getElementById('pub-photo').src = profile.photo;
    }

    // Busca os links
    const { data: links } = await supabase.from('links').select('*').order('id', { ascending: true });
    const container = document.getElementById('pub-links');
    
    container.innerHTML = links.map(l => `
        <a href="${l.url}" target="_blank" class="card-glass block w-full p-4 flex justify-between items-center hover:bg-white/10 transition-all">
            <div class="flex items-center gap-4">
                <i class="${l.icon} text-purple-400 text-xl"></i>
                <span class="font-medium">${l.label}</span>
            </div>
            <i class="fa-solid fa-chevron-right text-xs text-zinc-600"></i>
        </a>
    `).join('');
}

loadLinks();
