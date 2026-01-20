// Get the form and bird list elements
const form = document.getElementById('birdForm');
const birdList = document.getElementById('birdList');

// Get navigation elements
const addBtn = document.getElementById('addBtn');
const listBtn = document.getElementById('listBtn');
const addScreen = document.getElementById('addScreen');
const listScreen = document.getElementById('listScreen');

// Navigation between screens
addBtn.addEventListener('click', () => {
    addScreen.classList.remove('hidden');
    listScreen.classList.add('hidden');
    addBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    listScreen.classList.remove('hidden');
    addScreen.classList.add('hidden');
    listBtn.classList.add('active');
    addBtn.classList.remove('active');
    displayBirds();
});

// Load saved birds when the page loads
window.addEventListener('load', () => {
    displayBirds();
    // Set today's date as default
    document.getElementById('date').valueAsDate = new Date();
});

// Save a new bird when the form is submitted
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const birdName = document.getElementById('birdName').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const photoInput = document.getElementById('photo');
    
    // Handle the photo
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const bird = {
                id: Date.now(),
                name: birdName,
                location: location,
                date: date,
                photo: event.target.result
            };
            
            saveBird(bird);
            form.reset();
            document.getElementById('date').valueAsDate = new Date();
            alert('Bird saved! Click "My Birds" to see your list.');
        };
        
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        // Save without photo
        const bird = {
            id: Date.now(),
            name: birdName,
            location: location,
            date: date,
            photo: null
        };
        
        saveBird(bird);
        form.reset();
        document.getElementById('date').valueAsDate = new Date();
        alert('Bird saved! Click "My Birds" to see your list.');
    }
});

// Save bird to localStorage
function saveBird(bird) {
    let birds = getBirds();
    birds.push(bird);
    localStorage.setItem('birds', JSON.stringify(birds));
}

// Get all birds from localStorage
function getBirds() {
    const birds = localStorage.getItem('birds');
    return birds ? JSON.parse(birds) : [];
}

// Display all birds
function displayBirds() {
    const birds = getBirds();
    
    if (birds.length === 0) {
        birdList.innerHTML = '<p class="empty-message">No birds spotted yet. Go find some birds!</p>';
        return;
    }
    
    // Sort birds by date (newest first)
    birds.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    birdList.innerHTML = birds.map(bird => `
        <div class="bird-card">
            <h3>🐦 ${bird.name}</h3>
            <p><strong>Location:</strong> ${bird.location}</p>
            <p><strong>Date:</strong> ${formatDate(bird.date)}</p>
            ${bird.photo ? `<img src="${bird.photo}" alt="${bird.name}">` : ''}
            <button class="delete-btn" onclick="deleteBird(${bird.id})">Delete</button>
        </div>
    `).join('');
}

// Delete a bird
function deleteBird(id) {
    let birds = getBirds();
    birds = birds.filter(bird => bird.id !== id);
    localStorage.setItem('birds', JSON.stringify(birds));
    displayBirds();
}

// Format date to be more readable
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}
