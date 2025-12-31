import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('https://ynjfamqtftudexhzxmji.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluamZhbXF0ZnR1ZGV4aHp4bWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxODk1NjAsImV4cCI6MjA4Mjc2NTU2MH0.pFo_A1eZ8cVr2NoVjKrJg6soLKvbZS29QUmIKV-RN9s')

async function loadLinks() {
    try {
        // 1. Busca o perfil (sem o single() para evitar erro se estiver vazio)
        const { data: profiles, error: pError } = await supabase.from('profile').select('*');
        
        if (profiles && profiles.length > 0) {
            const profile = profiles[0];
            document.getElementById('pub-name').innerText = profile.name || "Nome não definido";
            document.getElementById('pub-bio').innerText = profile.bio || "";
            document.getElementById('pub-photo').src = profile.photo || 'https://via.placeholder.com/150';
        }

        // 2. Busca os links
        const { data: links, error: lError } = await supabase.from('links').select('*').order('id', { ascending: true });
        
        if (links) {
            const container = document.getElementById('pub-links');
            container.innerHTML = links.map(l => `
                <a href="${l.url}" target="_blank" class="card-glass block w-full p-4 flex justify-between items-center hover:bg-white/10 transition-all">
                    <div class="flex items-center gap-4">
                        <i class="${l.icon || 'fa-solid fa-link'} text-purple-400 text-xl"></i>
                        <span class="font-medium">${l.label}</span>
                    </div>
                    <i class="fa-solid fa-chevron-right text-xs text-zinc-600"></i>
                </a>
            `).join('');
        }
    } catch (err) {
        console.error("Erro crítico:", err);
    }
}

loadLinks();

