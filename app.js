function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = ''; 
    contacts.forEach((contact, index) => {
        const emailDisplay = contact.email ? contact.email : 'Não informado';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${emailDisplay}</td>
            <td>
                <button class="btn btn-edit" onclick="editContact(${index})">Editar</button>
                <button class="btn btn-delete" onclick="deleteContact(${index})">Excluir</button>
            </td>
        `;
        contactList.appendChild(row);
    });
}

function saveContact(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim(); 

    if (name && phone) {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        
        if (editingIndex !== null) {
            contacts[editingIndex] = { 
                name, 
                phone, 
                email: email || 'Não informado' 
            };
        } else {
            contacts.push({ 
                name, 
                phone, 
                email: email || 'Não informado'  // 
            });
        }

        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts(); 
        resetForm();
    }
}

let editingIndex = null;
function editContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];

    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email === 'Não informado' ? '' : contact.email;

    editingIndex = index;
    document.querySelector('button[type="submit"]').textContent = 'Atualizar Contato'; 
}

function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.splice(index, 1); 
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts(); 
}

function resetForm() {
    document.getElementById('contactForm').reset();
    editingIndex = null;
    document.querySelector('button[type="submit"]').textContent = 'Salvar Contato'; 
}

document.getElementById('contactForm').addEventListener('submit', saveContact);

window.onload = loadContacts;
