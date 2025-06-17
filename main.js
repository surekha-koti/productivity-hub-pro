// ProductivityHub Pro - Advanced JavaScript Functionality

class ProductivityHub {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('productivityHub_tasks')) || [];
        this.expenses = JSON.parse(localStorage.getItem('productivityHub_expenses')) || [];
        this.currentSection = 'dashboard';
        this.theme = localStorage.getItem('productivityHub_theme') || 'light';
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.applyTheme();
        this.updateDashboard();
        this.renderTasks();
        this.renderExpenses();
        
        // Hide loading screen after initialization
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2000);
    }

    // Loading Screen Management
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 350);
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // FAB (Floating Action Button)
        this.setupFAB();
        
        // Theme Toggle
        this.setupThemeToggle();
        
        // User Menu
        this.setupUserMenu();
        
        // Forms
        this.setupForms();
        
        // Task Management
        this.setupTaskManagement();
        
        // Expense Management
        this.setupExpenseManagement();
        
        // Contact Form
        this.setupContactForm();
        
        // Quick Actions
        this.setupQuickActions();
        
        // Modal Management
        this.setupModals();
        
        // Search and Filters
        this.setupSearchAndFilters();
        
        // Responsive Menu
        this.setupResponsiveMenu();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section);
                this.setActiveNavLink(link);
            });
        });
    }

    setupFAB() {
        const mainFab = document.getElementById('main-fab');
        const fabMenu = document.querySelector('.fab-menu');
        const fabItems = document.querySelectorAll('.fab-item');

        if (mainFab) {
            mainFab.addEventListener('click', () => {
                mainFab.classList.toggle('active');
                fabMenu.classList.toggle('active');
            });
        }

        fabItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                this.handleFabAction(action);
                mainFab.classList.remove('active');
                fabMenu.classList.remove('active');
            });
        });

        // Close FAB menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.fab-container')) {
                mainFab?.classList.remove('active');
                fabMenu?.classList.remove('active');
            }
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setupUserMenu() {
        const userAvatar = document.querySelector('.user-avatar');
        const userDropdown = document.querySelector('.user-dropdown');

        if (userAvatar && userDropdown) {
            userAvatar.addEventListener('click', () => {
                userDropdown.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.user-menu')) {
                    userDropdown.classList.remove('active');
                }
            });
        }
    }

    setupForms() {
        // Task Form
        const taskForm = document.getElementById('task-form');
        const addTaskBtn = document.getElementById('add-task-btn');
        const cancelTaskBtn = document.getElementById('cancel-task');
        const taskInputContainer = document.getElementById('task-input-container');

        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => {
                taskInputContainer?.classList.add('active');
                document.getElementById('task-input')?.focus();
            });
        }

        if (cancelTaskBtn) {
            cancelTaskBtn.addEventListener('click', () => {
                taskInputContainer?.classList.remove('active');
                taskForm?.reset();
            });
        }

        if (taskForm) {
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addTask();
            });
        }

        // Expense Form
        const expenseForm = document.getElementById('expense-form');
        const addExpenseBtn = document.getElementById('add-expense-btn');
        const cancelExpenseBtn = document.getElementById('cancel-expense');
        const expenseInputContainer = document.getElementById('expense-input-container');

        if (addExpenseBtn) {
            addExpenseBtn.addEventListener('click', () => {
                expenseInputContainer?.classList.add('active');
                document.getElementById('expense-description')?.focus();
            });
        }

        if (cancelExpenseBtn) {
            cancelExpenseBtn.addEventListener('click', () => {
                expenseInputContainer?.classList.remove('active');
                expenseForm?.reset();
            });
        }

        if (expenseForm) {
            expenseForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addExpense();
            });
        }
    }

    setupTaskManagement() {
        // View toggle
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const view = btn.getAttribute('data-view');
                this.changeTaskView(view);
            });
        });

        // Task sorting
        const taskSort = document.getElementById('task-sort');
        if (taskSort) {
            taskSort.addEventListener('change', () => {
                this.sortTasks(taskSort.value);
            });
        }
    }

    setupExpenseManagement() {
        // Set today's date as default
        const expenseDate = document.getElementById('expense-date');
        if (expenseDate) {
            expenseDate.value = new Date().toISOString().split('T')[0];
        }

        // Expense filtering
        const categoryFilter = document.getElementById('expense-category-filter');
        const dateFilter = document.getElementById('expense-date-filter');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => {
                this.filterExpenses();
            });
        }

        if (dateFilter) {
            dateFilter.addEventListener('change', () => {
                this.filterExpenses();
            });
        }
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitContactForm();
            });
        }
    }

    setupQuickActions() {
        const quickActionCards = document.querySelectorAll('.quick-action-card');
        quickActionCards.forEach(card => {
            card.addEventListener('click', () => {
                const action = card.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });
    }

    setupModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeModal(modal.id);
                });
            }

            // Close modal when clicking backdrop
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Close modals with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    this.closeModal(activeModal.id);
                }
            }
        });
    }

    setupSearchAndFilters() {
        // Task search
        const taskSearch = document.getElementById('task-search');
        if (taskSearch) {
            taskSearch.addEventListener('input', () => {
                this.searchTasks(taskSearch.value);
            });
        }

        // Task filters
        const taskFilters = document.querySelectorAll('.filter-btn');
        taskFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                taskFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterTasks(btn.getAttribute('data-filter'));
            });
        });

        // Priority filters
        const priorityFilters = document.querySelectorAll('.priority-filter');
        priorityFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                priorityFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterTasksByPriority(btn.getAttribute('data-priority'));
            });
        });

        // Expense search
        const expenseSearch = document.getElementById('expense-search');
        if (expenseSearch) {
            expenseSearch.addEventListener('input', () => {
                this.searchExpenses(expenseSearch.value);
            });
        }
    }

    setupResponsiveMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu?.classList.toggle('active');
            });
        }
    }

    // Navigation Management
    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;

            // Update title
            document.title = `ProductivityHub Pro - ${this.capitalizeFirst(sectionId)}`;

            // Trigger section-specific updates
            this.onSectionChange(sectionId);
        }
    }

    setActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    onSectionChange(sectionId) {
        switch (sectionId) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'tasks':
                this.renderTasks();
                break;
            case 'expenses':
                this.renderExpenses();
                break;
            case 'analytics':
                this.updateAnalytics();
                break;
        }
    }

    // Theme Management
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('productivityHub_theme', this.theme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // Task Management
    addTask() {
        const taskInput = document.getElementById('task-input');
        const categorySelect = document.getElementById('task-category');
        const prioritySelect = document.getElementById('task-priority');
        const dueDateInput = document.getElementById('task-due-date');
        const tagsInput = document.getElementById('task-tags');

        if (!taskInput?.value.trim()) {
            this.showToast('error', 'Error', 'Task description is required');
            return;
        }

        const task = {
            id: this.generateId(),
            title: taskInput.value.trim(),
            category: categorySelect?.value || 'other',
            priority: prioritySelect?.value || 'medium',
            dueDate: dueDateInput?.value || null,
            tags: tagsInput?.value ? tagsInput.value.split(',').map(tag => tag.trim()) : [],
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.renderTasks();
        this.updateDashboard();

        // Reset form and hide container
        document.getElementById('task-form')?.reset();
        document.getElementById('task-input-container')?.classList.remove('active');

        this.showToast('success', 'Success', 'Task added successfully');
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.updateDashboard();
            this.showToast('success', 'Success', 'Task deleted successfully');
        }
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveTasks();
            this.renderTasks();
            this.updateDashboard();

            const message = task.completed ? 'Task completed!' : 'Task marked as pending';
            this.showToast('success', 'Success', message);
        }
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        const emptyState = document.getElementById('task-list-empty');

        if (!taskList) return;

        if (this.tasks.length === 0) {
            taskList.innerHTML = '';
            emptyState?.classList.add('active');
            return;
        }

        emptyState?.classList.remove('active');

        const tasksHTML = this.tasks.map(task => this.createTaskHTML(task)).join('');
        taskList.innerHTML = tasksHTML;

        // Add event listeners to task items
        this.attachTaskEventListeners();
    }

    createTaskHTML(task) {
        const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;
        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
        
        return `
            <div class="task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}" data-task-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="app.toggleTask('${task.id}')">
                    ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <div class="task-content">
                    <div class="task-title">${this.escapeHtml(task.title)}</div>
                    <div class="task-meta">
                        <span class="task-category">${this.capitalizeFirst(task.category)}</span>
                        <span class="task-priority ${task.priority}">${this.capitalizeFirst(task.priority)}</span>
                        ${dueDate ? `<span class="task-due-date"><i class="fas fa-calendar"></i> ${dueDate}</span>` : ''}
                        ${task.tags.length > 0 ? `<span class="task-tags">${task.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}</span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-action-btn edit" onclick="app.editTask('${task.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-action-btn delete" onclick="app.deleteTask('${task.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    attachTaskEventListeners() {
        // Task item click handlers are handled by inline onclick for simplicity
        // In a production app, you'd want to use event delegation
    }

    sortTasks(sortBy) {
        switch (sortBy) {
            case 'priority':
                const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
                this.tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
                break;
            case 'due-date':
                this.tasks.sort((a, b) => {
                    if (!a.dueDate && !b.dueDate) return 0;
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);
                });
                break;
            case 'alphabetical':
                this.tasks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                this.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        this.renderTasks();
    }

    searchTasks(query) {
        const filteredTasks = this.tasks.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.category.toLowerCase().includes(query.toLowerCase()) ||
            task.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        this.renderFilteredTasks(filteredTasks);
    }

    filterTasks(filter) {
        let filteredTasks;
        const now = new Date();

        switch (filter) {
            case 'completed':
                filteredTasks = this.tasks.filter(task => task.completed);
                break;
            case 'pending':
                filteredTasks = this.tasks.filter(task => !task.completed);
                break;
            case 'overdue':
                filteredTasks = this.tasks.filter(task => 
                    task.dueDate && new Date(task.dueDate) < now && !task.completed
                );
                break;
            default:
                filteredTasks = this.tasks;
        }
        this.renderFilteredTasks(filteredTasks);
    }

    filterTasksByPriority(priority) {
        const filteredTasks = priority === 'all' 
            ? this.tasks 
            : this.tasks.filter(task => task.priority === priority);
        this.renderFilteredTasks(filteredTasks);
    }

    renderFilteredTasks(tasks) {
        const taskList = document.getElementById('task-list');
        const emptyState = document.getElementById('task-list-empty');

        if (!taskList) return;

        if (tasks.length === 0) {
            taskList.innerHTML = '';
            emptyState?.classList.add('active');
            return;
        }

        emptyState?.classList.remove('active');

        const tasksHTML = tasks.map(task => this.createTaskHTML(task)).join('');
        taskList.innerHTML = tasksHTML;
    }

    changeTaskView(view) {
        const taskList = document.getElementById('task-list');
        if (taskList) {
            taskList.className = `task-list ${view}-view`;
        }
    }

    // Expense Management
    addExpense() {
        const descriptionInput = document.getElementById('expense-description');
        const amountInput = document.getElementById('expense-amount');
        const categorySelect = document.getElementById('expense-category');
        const dateInput = document.getElementById('expense-date');
        const paymentSelect = document.getElementById('expense-payment');
        const notesInput = document.getElementById('expense-notes');

        if (!descriptionInput?.value.trim() || !amountInput?.value || !categorySelect?.value) {
            this.showToast('error', 'Error', 'Please fill in all required fields');
            return;
        }

        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            this.showToast('error', 'Error', 'Please enter a valid amount');
            return;
        }

        const expense = {
            id: this.generateId(),
            description: descriptionInput.value.trim(),
            amount: amount,
            category: categorySelect.value,
            date: dateInput?.value || new Date().toISOString().split('T')[0],
            paymentMethod: paymentSelect?.value || 'cash',
            notes: notesInput?.value?.trim() || '',
            createdAt: new Date().toISOString()
        };

        this.expenses.unshift(expense);
        this.saveExpenses();
        this.renderExpenses();
        this.updateDashboard();

        // Reset form and hide container
        document.getElementById('expense-form')?.reset();
        document.getElementById('expense-date').value = new Date().toISOString().split('T')[0];
        document.getElementById('expense-input-container')?.classList.remove('active');

        this.showToast('success', 'Success', 'Expense added successfully');
    }

    deleteExpense(expenseId) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(expense => expense.id !== expenseId);
            this.saveExpenses();
            this.renderExpenses();
            this.updateDashboard();
            this.showToast('success', 'Success', 'Expense deleted successfully');
        }
    }

    renderExpenses() {
        const expenseList = document.getElementById('expense-list');
        const emptyState = document.getElementById('expense-list-empty');

        if (!expenseList) return;

        if (this.expenses.length === 0) {
            expenseList.innerHTML = '';
            emptyState?.classList.add('active');
            return;
        }

        emptyState?.classList.remove('active');

        const expensesHTML = this.expenses.map(expense => this.createExpenseHTML(expense)).join('');
        expenseList.innerHTML = expensesHTML;
    }

    createExpenseHTML(expense) {
        const categoryIcons = {
            food: '🍔',
            transport: '🚗',
            shopping: '🛍️',
            entertainment: '🎬',
            bills: '💡',
            health: '🏥',
            education: '📚',
            travel: '✈️',
            other: '📦'
        };

        const date = new Date(expense.date).toLocaleDateString();
        
        return `
            <div class="expense-item" data-expense-id="${expense.id}">
                <div class="expense-icon">
                    ${categoryIcons[expense.category] || '📦'}
                </div>
                <div class="expense-content">
                    <div class="expense-description">${this.escapeHtml(expense.description)}</div>
                    <div class="expense-meta">
                        <span class="expense-category">${this.capitalizeFirst(expense.category)}</span>
                        <span class="expense-date"><i class="fas fa-calendar"></i> ${date}</span>
                        <span class="expense-payment">${this.capitalizeFirst(expense.paymentMethod)}</span>
                    </div>
                </div>
                <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                <div class="expense-actions">
                    <button class="task-action-btn edit" onclick="app.editExpense('${expense.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-action-btn delete" onclick="app.deleteExpense('${expense.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    searchExpenses(query) {
        const filteredExpenses = this.expenses.filter(expense =>
            expense.description.toLowerCase().includes(query.toLowerCase()) ||
            expense.category.toLowerCase().includes(query.toLowerCase())
        );
        this.renderFilteredExpenses(filteredExpenses);
    }

    filterExpenses() {
        const categoryFilter = document.getElementById('expense-category-filter')?.value;
        const dateFilter = document.getElementById('expense-date-filter')?.value;

        let filteredExpenses = this.expenses;

        // Filter by category
        if (categoryFilter && categoryFilter !== 'all') {
            filteredExpenses = filteredExpenses.filter(expense => expense.category === categoryFilter);
        }

        // Filter by date
        if (dateFilter && dateFilter !== 'all') {
            const now = new Date();
            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const startOfWeek = new Date(startOfToday.getTime() - (startOfToday.getDay() * 24 * 60 * 60 * 1000));
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const startOfYear = new Date(now.getFullYear(), 0, 1);

            filteredExpenses = filteredExpenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                switch (dateFilter) {
                    case 'today':
                        return expenseDate >= startOfToday;
                    case 'week':
                        return expenseDate >= startOfWeek;
                    case 'month':
                        return expenseDate >= startOfMonth;
                    case 'year':
                        return expenseDate >= startOfYear;
                    default:
                        return true;
                }
            });
        }

        this.renderFilteredExpenses(filteredExpenses);
    }

    renderFilteredExpenses(expenses) {
        const expenseList = document.getElementById('expense-list');
        const emptyState = document.getElementById('expense-list-empty');

        if (!expenseList) return;

        if (expenses.length === 0) {
            expenseList.innerHTML = '';
            emptyState?.classList.add('active');
            return;
        }

        emptyState?.classList.remove('active');

        const expensesHTML = expenses.map(expense => this.createExpenseHTML(expense)).join('');
        expenseList.innerHTML = expensesHTML;
    }

    // Dashboard Updates
    updateDashboard() {
        this.updateTaskStats();
        this.updateExpenseStats();
        this.updateProgressBars();
    }

    updateTaskStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const todayCompleted = this.tasks.filter(task => {
            if (!task.completed || !task.completedAt) return false;
            const completedDate = new Date(task.completedAt).toDateString();
            const today = new Date().toDateString();
            return completedDate === today;
        }).length;

        this.updateElement('total-tasks', totalTasks);
        this.updateElement('completed-tasks', todayCompleted);
        
        const completionRate = totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(0) : 0;
        this.updateElement('tasks-completion', `${completionRate}% completed`);
        
        const progressBar = document.getElementById('tasks-progress');
        if (progressBar) {
            progressBar.style.width = `${completionRate}%`;
        }
    }

    updateExpenseStats() {
        const totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const thisMonth = this.getMonthlyExpenses();
        const thisWeek = this.getWeeklyExpenses();
        
        // Calculate category breakdowns
        const foodExpenses = this.expenses
            .filter(e => e.category === 'food')
            .reduce((sum, expense) => sum + expense.amount, 0);
        const transportExpenses = this.expenses
            .filter(e => e.category === 'transport')
            .reduce((sum, expense) => sum + expense.amount, 0);

        this.updateElement('total-expenses', `$${totalExpenses.toFixed(2)}`);
        this.updateElement('this-month', `$${thisMonth.toFixed(2)}`);
        this.updateElement('week-expenses', `$${thisWeek.toFixed(2)}`);
        this.updateElement('month-expenses', `$${thisMonth.toFixed(2)}`);
        this.updateElement('food-expenses', `$${foodExpenses.toFixed(2)}`);
        this.updateElement('transport-expenses', `$${transportExpenses.toFixed(2)}`);

        // Calculate averages
        const daysThisMonth = new Date().getDate();
        const avgDaily = daysThisMonth > 0 ? thisMonth / daysThisMonth : 0;
        this.updateElement('avg-daily', `$${avgDaily.toFixed(2)}`);

        // Budget tracking
        const budget = 2000; // $2000 monthly budget
        const budgetUsed = (thisMonth / budget * 100).toFixed(0);
        const budgetRemaining = budget - thisMonth;
        
        this.updateElement('budget-remaining', `$${budgetRemaining.toFixed(2)}`);
        
        const budgetProgress = document.getElementById('budget-progress');
        if (budgetProgress) {
            budgetProgress.style.width = `${Math.min(budgetUsed, 100)}%`;
        }
    }

    updateProgressBars() {
        // Task completion animation
        const tasksProgress = document.getElementById('tasks-progress');
        if (tasksProgress) {
            setTimeout(() => {
                tasksProgress.style.transition = 'width 1s ease-out';
            }, 100);
        }

        // Budget progress animation
        const budgetProgress = document.getElementById('budget-progress');
        if (budgetProgress) {
            setTimeout(() => {
                budgetProgress.style.transition = 'width 1s ease-out';
            }, 100);
        }
    }

    getMonthlyExpenses() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        return this.expenses
            .filter(expense => new Date(expense.date) >= startOfMonth)
            .reduce((sum, expense) => sum + expense.amount, 0);
    }

    getWeeklyExpenses() {
        const now = new Date();
        const startOfWeek = new Date(now.getTime() - (now.getDay() * 24 * 60 * 60 * 1000));
        
        return this.expenses
            .filter(expense => new Date(expense.date) >= startOfWeek)
            .reduce((sum, expense) => sum + expense.amount, 0);
    }

    // Analytics
    updateAnalytics() {
        // This would integrate with Chart.js or similar library
        // For now, we'll just update the productivity score
        this.updateProductivityScore();
    }

    updateProductivityScore() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) : 0;
        
        const monthlyBudget = 2000;
        const monthlyExpenses = this.getMonthlyExpenses();
        const budgetAdherence = monthlyExpenses <= monthlyBudget ? 1 - (monthlyExpenses / monthlyBudget) : 0;
        
        const score = Math.round((taskCompletionRate * 0.6 + budgetAdherence * 0.4) * 100);
        
        this.updateElement('productivity-score', score);
    }

    // Contact Form
    submitContactForm() {
        const form = document.getElementById('contact-form');
        const formData = new FormData(form);
        
        // Basic validation
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!firstName || !lastName || !email || !message) {
            this.showToast('error', 'Error', 'Please fill in all required fields');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showToast('error', 'Error', 'Please enter a valid email address');
            return;
        }

        // Simulate form submission
        setTimeout(() => {
            this.showModal('success-modal');
            form.reset();
        }, 1000);
    }

    // Action Handlers
    handleFabAction(action) {
        switch (action) {
            case 'add-task':
                this.showSection('tasks');
                setTimeout(() => {
                    document.getElementById('add-task-btn')?.click();
                }, 100);
                break;
            case 'add-expense':
                this.showSection('expenses');
                setTimeout(() => {
                    document.getElementById('add-expense-btn')?.click();
                }, 100);
                break;
            case 'export-data':
                this.exportData();
                break;
        }
    }

    handleQuickAction(action) {
        switch (action) {
            case 'add-task':
                this.showSection('tasks');
                setTimeout(() => {
                    document.getElementById('add-task-btn')?.click();
                }, 100);
                break;
            case 'add-expense':
                this.showSection('expenses');
                setTimeout(() => {
                    document.getElementById('add-expense-btn')?.click();
                }, 100);
                break;
            case 'view-reports':
                this.showSection('analytics');
                break;
            case 'export-data':
                this.exportData();
                break;
        }
    }

    // Data Management
    saveTasks() {
        localStorage.setItem('productivityHub_tasks', JSON.stringify(this.tasks));
    }

    saveExpenses() {
        localStorage.setItem('productivityHub_expenses', JSON.stringify(this.expenses));
    }

    exportData() {
        const data = {
            tasks: this.tasks,
            expenses: this.expenses,
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `productivity-hub-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        this.showToast('success', 'Success', 'Data exported successfully');
    }

    // Modal Management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Toast Notifications
    showToast(type, title, message) {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toastId = this.generateId();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.id = toastId;

        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${iconMap[type] || iconMap.info}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="app.closeToast('${toastId}')">
                <i class="fas fa-times"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.closeToast(toastId);
        }, 5000);
    }

    closeToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.style.animation = 'slideInRight 0.3s ease-in-out reverse';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }

    // Utility Functions
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    // Placeholder methods for future functionality
    editTask(taskId) {
        this.showToast('info', 'Coming Soon', 'Task editing feature coming soon!');
    }

    editExpense(expenseId) {
        this.showToast('info', 'Coming Soon', 'Expense editing feature coming soon!');
    }
}

// Global functions for inline event handlers
window.closeModal = function(modalId) {
    if (window.app) {
        window.app.closeModal(modalId);
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ProductivityHub();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.app) {
        // Refresh data when page becomes visible
        window.app.updateDashboard();
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    if (window.app) {
        window.app.showToast('success', 'Online', 'Connection restored');
    }
});

window.addEventListener('offline', () => {
    if (window.app) {
        window.app.showToast('warning', 'Offline', 'Working in offline mode');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (window.app) {
        // Ctrl/Cmd + N: New task
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            window.app.showSection('tasks');
            setTimeout(() => {
                document.getElementById('add-task-btn')?.click();
            }, 100);
        }
        
        // Ctrl/Cmd + E: New expense
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            window.app.showSection('expenses');
            setTimeout(() => {
                document.getElementById('add-expense-btn')?.click();
            }, 100);
        }
        
        // Ctrl/Cmd + D: Dashboard
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            window.app.showSection('dashboard');
        }
    }
});