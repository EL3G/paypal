// DOM Elements
const dashboardScreen = document.getElementById('dashboard-screen');
const sendScreen = document.getElementById('send-screen');
const recipientScreen = document.getElementById('recipient-screen');
const loadingOverlay = document.getElementById('loading-overlay');
const successModal = document.getElementById('success-modal');
const activityList = document.getElementById('activity-list');
const recentContactsList = document.getElementById('recent-contacts-list');

const inicioLink = document.getElementById('inicio-link');
const enviarSolicitarLink = document.getElementById('enviar-solicitar-link');
const balanceAmount = document.getElementById('balance-amount');
const sendButton = document.getElementById('send-button');
const transferButton = document.getElementById('transfer-button');
const nextButton = document.getElementById('next-button');
const confirmSend = document.getElementById('confirm-send');
const cancelButton = document.getElementById('cancel-button');
const doneButton = document.getElementById('done-button');

const recipientSearch = document.getElementById('recipient-search');
const searchError = document.getElementById('search-error');
const suggestions = document.getElementById('suggestions');
const recipientName = document.getElementById('recipient-name');
const recipientUsername = document.getElementById('recipient-username');
const profileImage = document.getElementById('profile-image');
const moneyInput = document.getElementById('money-input');
const moneyError = document.getElementById('money-error');
const noteInput = document.getElementById('note-input');
const loadingMessage = document.getElementById('loading-message');
const sentAmount = document.getElementById('sent-amount');
const currencySymbol = document.getElementById('currency-symbol');
const currencyButton = document.getElementById('currency-button');
const currencyDropdown = document.getElementById('currency-dropdown');
const successAvatar = document.getElementById('success-avatar');

// LocalStorage helper functions
function saveToLocalStorage() {
    try {
        localStorage.setItem('balance', balance.toString());
        localStorage.setItem('recentContacts', JSON.stringify(recentContacts));
        localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function loadFromLocalStorage() {
    try {
        const savedBalance = localStorage.getItem('balance');
        const savedContacts = localStorage.getItem('recentContacts');
        const savedTransactions = localStorage.getItem('transactions');

        return {
            balance: savedBalance ? parseFloat(savedBalance) : 8857651931.00,
            recentContacts: savedContacts ? JSON.parse(savedContacts) : [
                { name: "Carlos Lora", username: "@carloslora" },
                { name: "Oscar Hernandez", username: "@oscarhdz" },
                { name: "Cristal Rojas", username: "@cristalr" },
                { name: "Pablo Santillan", username: "@pablos" }
            ],
            transactions: savedTransactions ? JSON.parse(savedTransactions) : [
                {
                    type: 'sent',
                    name: 'TikTok',
                    amount: '50.00',
                    date: 'Apr 20, 2025',
                    message: 'Payment for ad campaign'
                },
                {
                    type: 'received',
                    name: 'Carlos Lora',
                    amount: '100.00',
                    date: 'Apr 19, 2025',
                    message: 'Thanks for the project!'
                },
                {
                    type: 'sent',
                    name: 'Etsy Shop',
                    amount: '35.00',
                    date: 'Apr 18, 2025',
                    message: 'Purchase of handmade jewelry'
                },
                {
                    type: 'received',
                    name: 'Sofia Ramirez',
                    amount: '75.00',
                    date: 'Apr 17, 2025',
                    message: 'Payment for freelance work'
                },
                {
                    type: 'sent',
                    name: 'Pablo Santillan',
                    amount: '20.00',
                    date: 'Apr 16, 2025',
                    message: 'Lunch reimbursement'
                },
                {
                    type: 'received',
                    name: 'Shopify Store',
                    amount: '120.00',
                    date: 'Apr 15, 2025',
                    message: 'Refund for returned item'
                }
            ]
        };
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return {
            balance: 8857651931.00,
            recentContacts: [
                { name: "Carlos Lora", username: "@carloslora" },
                { name: "Oscar Hernandez", username: "@oscarhdz" },
                { name: "Cristal Rojas", username: "@cristalr" },
                { name: "Pablo Santillan", username: "@pablos" }
            ],
            transactions: [
                {
                    type: 'sent',
                    name: 'TikTok',
                    amount: '50.00',
                    date: 'Apr 20, 2025',
                    message: 'Payment for ad campaign'
                },
                {
                    type: 'received',
                    name: 'Carlos Lora',
                    amount: '100.00',
                    date: 'Apr 19, 2025',
                    message: 'Thanks for the project!'
                },
                {
                    type: 'sent',
                    name: 'Etsy Shop',
                    amount: '35.00',
                    date: 'Apr 18, 2025',
                    message: 'Purchase of handmade jewelry'
                },
                {
                    type: 'received',
                    name: 'Sofia Ramirez',
                    amount: '75.00',
                    date: 'Apr 17, 2025',
                    message: 'Payment for freelance work'
                },
                {
                    type: 'sent',
                    name: 'Pablo Santillan',
                    amount: '20.00',
                    date: 'Apr 16, 2025',
                    message: 'Lunch reimbursement'
                },
                {
                    type: 'received',
                    name: 'Shopify Store',
                    amount: '120.00',
                    date: 'Apr 15, 2025',
                    message: 'Refund for returned item'
                }
            ]
        };
    }
}

// Initialize data from localStorage or defaults
const savedData = loadFromLocalStorage();
let balance = savedData.balance;
let recentContacts = savedData.recentContacts;
let transactions = savedData.transactions;

// Update balance display
function updateBalanceDisplay() {
    try {
        balanceAmount.textContent = `USD ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } catch (e) {
        console.error('Error updating balance display:', e);
    }
}
updateBalanceDisplay();

// Fake conversion rates (simplified)
const conversionRates = {
    USD: 1,
    EUR: 0.95,
    GBP: 0.82
};

// Current currency
let currentCurrency = 'USD';

// Fake users list for suggestions with varied background colors
const colors = ['142c8e', '1d9b6c', '003087', '247b38', '00b7eb', 'c71585'];
const fakeUsers = [
    { name: "Carlos Lora", username: "@carlitoslor", avatar: `https://ui-avatars.com/api/?name=Carlos+Lora&size=40&background=${colors[0]}&color=ffffff` },
    { name: "Oscar Hernandez", username: "@oscarhdz", avatar: `https://ui-avatars.com/api/?name=Oscar+Hernandez&size=40&background=${colors[1]}&color=ffffff` },
    { name: "Cristal Rojas", username: "@cristalroj2", avatar: `https://ui-avatars.com/api/?name=Cristal+Rojas&size=40&background=${colors[2]}&color=ffffff` },
    { name: "Pablo Santillan", username: "@pablosan65", avatar: `https://ui-avatars.com/api/?name=Pablo+Santillan&size=40&background=${colors[3]}&color=ffffff` },
    { name: "Maria Gomez", username: "@mariagomez89", avatar: `https://ui-avatars.com/api/?name=Maria+Gomez&size=40&background=${colors[4]}&color=ffffff` },
    { name: "Juan Martinez", username: "@juanmartinez45", avatar: `https://ui-avatars.com/api/?name=Juan+Martinez&size=40&background=${colors[5]}&color=ffffff` },
    { name: "Sofia Ramirez", username: "@sofiaramirez22", avatar: `https://ui-avatars.com/api/?name=Sofia+Ramirez&size=40&background=${colors[0]}&color=ffffff` },
    { name: "Luis Torres", username: "@luist88", avatar: `https://ui-avatars.com/api/?name=Luis+Torres&size=40&background=${colors[1]}&color=ffffff` },
    { name: "Ana Lopez", username: "@analopez33", avatar: `https://ui-avatars.com/api/?name=Ana+Lopez&size=40&background=${colors[2]}&color=ffffff` },
    { name: "Diego Vargas", username: "@diegovargas77", avatar: `https://ui-avatars.com/api/?name=Diego+Vargas&size=40&background=${colors[3]}&color=ffffff` },
    { name: "Laura Morales", username: "@lauramorales11", avatar: `https://ui-avatars.com/api/?name=Laura+Morales&size=40&background=${colors[4]}&color=ffffff` },
    { name: "Gabriel Castro", username: "@gabrielcastro99", avatar: `https://ui-avatars.com/api/?name=Gabriel+Castro&size=40&background=${colors[5]}&color=ffffff` }
];

// Variable to store the selected recipient's avatar
let selectedAvatar = '';

// Function to sanitize input to prevent XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Function to generate initials from a name
function getInitials(name) {
    const nameParts = name.split(' ').filter(part => part.length > 0);
    if (nameParts.length === 0) return '';
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
}

// Function to generate an avatar URL for any name
function generateAvatar(name, size) {
    const colorIndex = Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length);
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=${colors[colorIndex]}&color=ffffff`;
}

// Function to update recent activity
function updateRecentActivity() {
    try {
        activityList.innerHTML = '';
        if (transactions.length === 0) {
            activityList.innerHTML = '<li class="transaction-item" role="listitem"><p>No recent activity.</p></li>';
            return;
        }

        transactions.forEach((transaction, index) => {
            const isReceived = transaction.type === 'received';
            const isCompany = ['TikTok', 'Etsy Shop', 'Shopify Store'].includes(transaction.name);
            const foundUser = fakeUsers.find(user => user.name.toUpperCase() === transaction.name.toUpperCase());
            const avatarSrc = foundUser ? foundUser.avatar : generateAvatar(transaction.name, 40);

            const companyAvatar = `
                <svg class="avatar transaction-avatar" aria-hidden="true">
                    <use xlink:href="#store-icon"></use>
                </svg>
            `;

            const defaultAvatar = `
                <div class="avatar transaction-avatar">
                    <img src="${avatarSrc}" alt="${transaction.name}'s avatar">
                </div>
            `;

            const transactionItem = document.createElement('li');
            transactionItem.classList.add('transaction-item');
            transactionItem.setAttribute('role', 'listitem');
            transactionItem.setAttribute('aria-label', `${isReceived ? 'Received' : 'Sent'} $${transaction.amount} ${isReceived ? 'from' : 'to'} ${transaction.name} on ${transaction.date}`);
            transactionItem.innerHTML = `
                <div class="transaction-info">
                    ${isCompany ? companyAvatar : defaultAvatar}
                    <div class="transaction-details">
                        <div class="transaction-name">${sanitizeInput(transaction.name)}</div>
                        <div class="transaction-date">${transaction.date}</div>
                        ${transaction.message ? `<div class="transaction-message">"${sanitizeInput(transaction.message)}"</div>` : ''}
                    </div>
                </div>
                <div class="transaction-amount ${isReceived ? 'income' : 'expense'}">${isReceived ? '+' : '-'} $${transaction.amount}</div>
            `;
            activityList.appendChild(transactionItem);
        });
    } catch (e) {
        console.error('Error updating recent activity:', e);
        activityList.innerHTML = '<li class="transaction-item" role="listitem"><p>Error loading transactions.</p></li>';
    }
}

// Function to update recent contacts
function updateRecentContacts() {
    try {
        const containers = [recentContactsList, document.getElementById('recent-contacts-list-old')];
        containers.forEach(container => {
            if (!container) return;
            container.innerHTML = '';
            const contactsToShow = container === recentContactsList ? recentContacts.slice(0, 4) : recentContacts;
            contactsToShow.forEach(contact => {
                const foundUser = fakeUsers.find(user => user.name.toUpperCase() === contact.name.toUpperCase());
                const avatar = foundUser ? foundUser.avatar.replace('size=40', 'size=50') : generateAvatar(contact.name, 50);
                const contactItem = document.createElement('div');
                contactItem.classList.add(container === recentContactsList ? 'contact' : 'recent-contact');
                contactItem.innerHTML = `
                    <div class="${container === recentContactsList ? 'contact-avatar avatar' : 'recent-contact-avatar avatar'}">
                        <img src="${avatar}" alt="${contact.name}'s avatar">
                    </div>
                    <div class="${container === recentContactsList ? 'contact-name' : 'recent-contact-name'}">${sanitizeInput(contact.name)}</div>
                `;
                contactItem.addEventListener('click', () => {
                    recipientSearch.value = contact.name;
                    handleNextButton();
                });
                container.appendChild(contactItem);
            });
        });
    } catch (e) {
        console.error('Error updating recent contacts:', e);
        recentContactsList.innerHTML = '<div class="contact"><p>Error loading contacts.</p></div>';
    }
}

// Initial render
function initializeApp() {
    try {
        updateRecentActivity();
        updateRecentContacts();
        showDashboard();
    } catch (e) {
        console.error('Error initializing app:', e);
    }
}

// Event Listeners
function setupEventListeners() {
    try {
        inicioLink.addEventListener('click', (e) => {
            e.preventDefault();
            showDashboard();
        });
        enviarSolicitarLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSendScreen();
        });
        sendButton.addEventListener('click', showSendScreen);
        transferButton.addEventListener('click', showSendScreen);
        nextButton.addEventListener('click', handleNextButton);
        confirmSend.addEventListener('click', processPayment);
        cancelButton.addEventListener('click', (e) => {
            e.preventDefault();
            showSendScreen();
        });
        doneButton.addEventListener('click', completeTransaction);

        recipientSearch.addEventListener('input', function() {
            try {
                const query = sanitizeInput(this.value.trim());
                searchError.style.display = 'none';
                nextButton.classList.remove('active');
                suggestions.classList.add('hidden');

                if (query === '') {
                    return;
                }

                nextButton.classList.add('active');

                const searchTerm = query.toLowerCase();
                const filteredUsers = fakeUsers.filter(user =>
                    user.name.toLowerCase().includes(searchTerm) ||
                    user.username.toLowerCase().includes(searchTerm)
                );

                suggestions.innerHTML = '';
                if (filteredUsers.length > 0) {
                    filteredUsers.slice(0, 5).forEach(user => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.classList.add('suggestion-item');
                        suggestionItem.innerHTML = `
                            <img src="${user.avatar}" alt="${user.name}'s avatar">
                            <span>${sanitizeInput(user.name)} (${sanitizeInput(user.username)})</span>
                        `;
                        suggestionItem.addEventListener('click', () => {
                            recipientSearch.value = user.name;
                            suggestions.classList.add('hidden');
                            nextButton.classList.add('active');
                        });
                        suggestions.appendChild(suggestionItem);
                    });
                    suggestions.classList.remove('hidden');
                }
            } catch (e) {
                console.error('Error handling search input:', e);
            }
        });

        document.addEventListener('click', function(e) {
            try {
                if (!recipientSearch.contains(e.target) && !suggestions.contains(e.target)) {
                    suggestions.classList.add('hidden');
                }
                if (!currencyButton.contains(e.target) && !currencyDropdown.contains(e.target)) {
                    currencyDropdown.classList.remove('active');
                }
            } catch (e) {
                console.error('Error handling click outside:', e);
            }
        });

        moneyInput.addEventListener('focus', function() {
            try {
                if (this.value === '0.00') {
                    this.value = '';
                }
                moneyError.style.display = 'none';
                this.classList.remove('money-input-error');
            } catch (e) {
                console.error('Error handling money input focus:', e);
            }
        });

        moneyInput.addEventListener('blur', function() {
            try {
                let value = this.value.replace(/[^0-9.]/g, '');
                if (value === '' || isNaN(parseFloat(value))) {
                    this.value = '0.00';
                } else {
                    value = parseFloat(value).toFixed(2);
                    this.value = value;
                }
            } catch (e) {
                console.error('Error handling money input blur:', e);
            }
        });

        moneyInput.addEventListener('input', function() {
            try {
                this.value = this.value.replace(/[^0-9.]/g, '');
                let value = parseFloat(this.value);
                const decimalCount = (this.value.match(/\./g) || []).length;
                if (decimalCount > 1) {
                    this.value = this.value.replace(/\.(?=.*\.)/g, '');
                }
                const parts = this.value.split('.');
                if (parts[1] && parts[1].length > 2) {
                    this.value = `${parts[0]}.${parts[1].slice(0, 2)}`;
                }
                value = parseFloat(this.value) || 0;
                if (value < 0) {
                    this.value = '0.00';
                    moneyError.textContent = 'Amount cannot be negative.';
                    moneyError.style.display = 'block';
                    this.classList.add('money-input-error');
                } else if (value > 1000000) {
                    this.value = '1000000.00';
                    moneyError.textContent = 'Amount cannot exceed 1,000,000.';
                    moneyError.style.display = 'block';
                    this.classList.add('money-input-error');
                } else {
                    moneyError.style.display = 'none';
                    this.classList.remove('money-input-error');
                }
            } catch (e) {
                console.error('Error handling money input:', e);
            }
        });

        currencyButton.addEventListener('click', function() {
            try {
                currencyDropdown.classList.toggle('active');
            } catch (e) {
                console.error('Error handling currency button click:', e);
            }
        });

        document.querySelectorAll('.currency-option').forEach(option => {
            option.addEventListener('click', function() {
                try {
                    const newCurrency = this.getAttribute('data-currency');
                    const newSymbol = this.getAttribute('data-symbol');
                    const currentAmount = parseFloat(moneyInput.value) || 0;

                    const amountInUSD = currentAmount / conversionRates[currentCurrency];
                    const newAmount = (amountInUSD * conversionRates[newCurrency]).toFixed(2);

                    currentCurrency = newCurrency;
                    currencySymbol.textContent = newSymbol;
                    currencyButton.innerHTML = `${newCurrency} <i class="fa-solid fa-angle-down"></i>`;
                    moneyInput.value = newAmount;
                    currencyDropdown.classList.remove('active');
                } catch (e) {
                    console.error('Error handling currency option click:', e);
                }
            });
        });
    } catch (e) {
        console.error('Error setting up event listeners:', e);
    }
}

// Functions
function showDashboard() {
    try {
        dashboardScreen.classList.remove('hidden');
        sendScreen.classList.add('hidden');
        recipientScreen.classList.add('hidden');
        successModal.classList.remove('active');

        inicioLink.classList.add('active');
        enviarSolicitarLink.classList.remove('active');
    } catch (e) {
        console.error('Error showing dashboard:', e);
    }
}

function showSendScreen() {
    try {
        showLoading('Loading your contacts...');

        setTimeout(() => {
            hideLoading();
            dashboardScreen.classList.add('hidden');
            sendScreen.classList.remove('hidden');
            recipientScreen.classList.add('hidden');
            successModal.classList.remove('active');

            inicioLink.classList.remove('active');
            enviarSolicitarLink.classList.add('active');

            recipientSearch.value = '';
            searchError.style.display = 'none';
            suggestions.classList.add('hidden');
            nextButton.classList.remove('active');
        }, 800);
    } catch (e) {
        console.error('Error showing send screen:', e);
    }
}

function handleNextButton() {
    try {
        const recipientInput = sanitizeInput(recipientSearch.value.trim());
        if (!recipientInput) {
            searchError.style.display = 'block';
            return;
        }

        showLoading('Loading recipient details...');
        setTimeout(() => {
            hideLoading();
            dashboardScreen.classList.add('hidden');
            sendScreen.classList.add('hidden');
            recipientScreen.classList.remove('hidden');

            // Determinar el nombre y el username
            let recipient = recipientInput;
            let username = recipientInput;

            if (recipientInput.startsWith('@')) {
                recipient = recipientInput.substring(1); // Quitar el @ para el nombre
                username = recipientInput; // Mantener el username como se escribió
            } else {
                username = `@${recipientInput.toLowerCase()}`; // Agregar @ al username
            }

            // Mostrar el nombre sin @ y en mayúsculas
            recipientName.textContent = recipient.replace(/^@/, '').toUpperCase();
            // Mostrar el username exactamente como se escribió
            recipientUsername.textContent = username;

            // Buscar el avatar del usuario seleccionado
            const foundUser = fakeUsers.find(user => user.name.toUpperCase() === recipient.toUpperCase() || user.username.toUpperCase() === username.toUpperCase());
            const avatarUrl = foundUser ? foundUser.avatar.replace('size=40', 'size=72') : generateAvatar(recipient, 72);
            profileImage.innerHTML = `<img src="${avatarUrl}" alt="${recipient}'s avatar">`;

            // Guardar el avatar para usarlo en la pantalla de éxito
            selectedAvatar = avatarUrl;

            moneyInput.value = '0.00';
            noteInput.value = '';
            currentCurrency = 'USD';
            currencySymbol.textContent = '$';
            currencyButton.innerHTML = 'USD <i class="fa-solid fa-angle-down"></i>';
        }, 800);
    } catch (e) {
        console.error('Error handling next button:', e);
        hideLoading();
        searchError.style.display = 'block';
        searchError.textContent = 'An error occurred. Please try again.';
    }
}

function showLoading(message) {
    try {
        loadingMessage.textContent = message;
        loadingOverlay.classList.add('active');
    } catch (e) {
        console.error('Error showing loading overlay:', e);
    }
}

function hideLoading() {
    try {
        loadingOverlay.classList.remove('active');
    } catch (e) {
        console.error('Error hiding loading overlay:', e);
    }
}

function processPayment() {
    try {
        const amount = parseFloat(moneyInput.value);
        if (isNaN(amount) || amount <= 0) {
            moneyError.textContent = 'Please enter a valid amount.';
            moneyError.style.display = 'block';
            moneyInput.classList.add('money-input-error');
            return;
        }

        if (amount > balance) {
            moneyError.textContent = 'Insufficient funds.';
            moneyError.style.display = 'block';
            moneyInput.classList.add('money-input-error');
            return;
        }

        // Determinar el tiempo de carga según el monto
        let loadingTime = 1500; // Base
        if (amount >= 100000) {
            loadingTime = 3000; // Más largo para montos grandes
        } else if (amount >= 10000) {
            loadingTime = 2500;
        } else if (amount >= 1000) {
            loadingTime = 2000;
        }

        showLoading('Processing your payment...');

        setTimeout(() => {
            try {
                // Convertir el monto a USD para el balance
                const amountInUSD = amount / conversionRates[currentCurrency];
                balance -= amountInUSD;
                updateBalanceDisplay();

                // Registrar la transacción
                const recipient = recipientName.textContent;
                const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const note = sanitizeInput(noteInput.value.trim());
                transactions.unshift({
                    type: 'sent',
                    name: recipient,
                    amount: amount.toFixed(2),
                    date: today,
                    message: note || ''
                });

                // Actualizar contactos recientes
                const existingContactIndex = recentContacts.findIndex(contact => contact.name.toUpperCase() === recipient.toUpperCase());
                if (existingContactIndex !== -1) {
                    recentContacts.splice(existingContactIndex, 1);
                }
                recentContacts.unshift({ name: recipient, username: recipientUsername.textContent });

                // Guardar en localStorage
                saveToLocalStorage();

                // Mostrar pantalla de éxito
                dashboardScreen.classList.add('hidden');
                sendScreen.classList.add('hidden');
                recipientScreen.classList.add('hidden');
                successModal.classList.add('active');

                sentAmount.textContent = `${amount.toFixed(2)} ${currentCurrency}`;
                successAvatar.innerHTML = `<img src="${selectedAvatar}" alt="${recipient}'s avatar">`;

                updateRecentActivity();
                updateRecentContacts();
            } catch (e) {
                console.error('Error during payment processing:', e);
                moneyError.textContent = 'An error occurred during payment processing.';
                moneyError.style.display = 'block';
            } finally {
                hideLoading();
            }
        }, loadingTime);
    } catch (e) {
        console.error('Error processing payment:', e);
        moneyError.textContent = 'An error occurred during payment processing.';
        moneyError.style.display = 'block';
        hideLoading();
    }
}

function completeTransaction() {
    try {
        showLoading('Returning to dashboard...');
        setTimeout(() => {
            hideLoading();
            showDashboard();
        }, 800);
    } catch (e) {
        console.error('Error completing transaction:', e);
        showDashboard();
    }
}

// Initialize the app
initializeApp();
setupEventListeners();
