// SkillSwap Dashboard JavaScript
// Main application state and functionality

class SkillSwapDashboard {
    constructor() {
        this.courses = [
            {
                id: 1,
                title: "Advanced JavaScript",
                instructor: "Sarah Chen",
                rating: 4.9,
                description: "Master advanced JavaScript concepts including closures, prototypes, and async programming.",
                progress: 75,
                category: "Programming"
            },
            {
                id: 2,
                title: "UI/UX Design Principles",
                instructor: "Michael Rodriguez",
                rating: 4.7,
                description: "Learn the fundamentals of user interface and user experience design.",
                progress: 45,
                category: "Design"
            },
            {
                id: 3,
                title: "Data Science Fundamentals",
                instructor: "Dr. Emily Watson",
                rating: 4.8,
                description: "Introduction to data analysis, visualization, and machine learning basics.",
                progress: 20,
                category: "Data Science"
            },
            {
                id: 4,
                title: "Digital Marketing Strategy",
                instructor: "James Thompson",
                rating: 4.6,
                description: "Build comprehensive digital marketing campaigns and strategies.",
                progress: 60,
                category: "Marketing"
            }
        ];

        this.messages = [
            {
                id: 1,
                sender: "Sarah Chen",
                avatar: "SC",
                content: "Hey! How's the JavaScript course going?",
                timestamp: new Date(Date.now() - 2 * 60 * 1000)
            },
            {
                id: 2,
                sender: "Michael Rodriguez",
                avatar: "MR",
                content: "Great job on the design assignment! 🎨",
                timestamp: new Date(Date.now() - 15 * 60 * 1000)
            },
            {
                id: 3,
                sender: "Dr. Emily Watson",
                avatar: "EW",
                content: "Don't forget about tomorrow's live session on data visualization",
                timestamp: new Date(Date.now() - 60 * 60 * 1000)
            }
        ];

        this.notifications = 3;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateTimeStamps();
        this.animateProgressBars();
        
        // Update timestamps every minute
        setInterval(() => this.updateTimeStamps(), 60000);
    }

    setupEventListeners() {
        // Navigation menu
        this.setupNavigation();
        
        // Search functionality
        this.setupSearch();
        
        // Course interactions
        this.setupCourseInteractions();
        
        // Chat functionality
        this.setupChat();
        
        // Quick actions
        this.setupQuickActions();
        
        // Floating button
        this.setupFloatingButton();
        
        // Notifications
        this.setupNotifications();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Get the section name from the link text
                const section = link.textContent.trim();
                this.showNotification(Navigating to ${section}...);
                
                // Simulate page navigation with animation
                this.animatePageTransition();
            });
        });
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchIcon = document.querySelector('.search-icon');
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const query = e.target.value.trim();
                if (query) {
                    this.performSearch(query);
                }
            }, 300);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    this.performSearch(query);
                }
            }
        });
        
        searchIcon.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                this.performSearch(query);
            }
        });
    }

    setupCourseInteractions() {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach((card, index) => {
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
            
            // Add click functionality
            card.addEventListener('click', () => {
                const course = this.courses[index];
                this.openCourse(course);
            });
            
            // Add progress update functionality
            const progressBar = card.querySelector('.course-progress-fill');
            if (progressBar) {
                progressBar.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.updateCourseProgress(index);
                });
            }
        });
    }

    setupChat() {
        const chatInput = document.querySelector('.chat-input input');
        const sendButton = document.querySelector('.chat-input button');
        const chatMessages = document.querySelector('.chat-messages');
        
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (message) {
                this.addChatMessage(message);
                chatInput.value = '';
            }
        };
        
        sendButton.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Make chat messages clickable
        chatMessages.addEventListener('click', (e) => {
            const messageElement = e.target.closest('.chat-message');
            if (messageElement) {
                const avatar = messageElement.querySelector('.message-avatar').textContent;
                const instructor = this.getInstructorByAvatar(avatar);
                if (instructor) {
                    this.showNotification(Opening chat with ${instructor}...);
                }
            }
        });
    }

    setupQuickActions() {
        const actionButtons = document.querySelectorAll('.action-btn');
        
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const action = button.textContent.trim();
                this.handleQuickAction(action);
                
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    setupFloatingButton() {
        const floatingBtn = document.querySelector('.floating-btn');
        
        if (floatingBtn) {
            floatingBtn.addEventListener('click', () => {
                this.showAddCourseModal();
            });
        }
    }

    setupNotifications() {
        const notificationBtn = document.querySelector('.notification-btn');
        
        notificationBtn.addEventListener('click', () => {
            this.showNotificationsPanel();
        });
    }

    // Core functionality methods
    performSearch(query) {
        console.log('Searching for:', query);
        
        // Filter courses based on search query
        const filteredCourses = this.courses.filter(course => 
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.instructor.toLowerCase().includes(query.toLowerCase()) ||
            course.category.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredCourses.length > 0) {
            this.showNotification(Found ${filteredCourses.length} result(s) for "${query}");
            this.displaySearchResults(filteredCourses);
        } else {
            this.showNotification(No results found for "${query}");
        }
    }

    displaySearchResults(courses) {
        const courseGrid = document.querySelector('.course-grid');
        courseGrid.style.opacity = '0.5';
        
        setTimeout(() => {
            courseGrid.style.opacity = '1';
            this.showNotification('Search results updated');
        }, 300);
    }

    openCourse(course) {
        this.showNotification(Opening ${course.title}...);
        
        // Create modal or navigate to course page
        this.showCourseModal(course);
    }

    showCourseModal(course) {
        const modal = this.createModal(`
            <div class="course-modal">
                <h2>${course.title}</h2>
                <p><strong>Instructor:</strong> ${course.instructor}</p>
                <p><strong>Rating:</strong> ⭐ ${course.rating}</p>
                <p><strong>Progress:</strong> ${course.progress}% Complete</p>
                <p>${course.description}</p>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="skillswap.continueCourse(${course.id})">Continue Learning</button>
                    <button class="btn-secondary" onclick="skillswap.closeModal()">Close</button>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    updateCourseProgress(courseIndex) {
        const course = this.courses[courseIndex];
        const newProgress = Math.min(course.progress + 5, 100);
        
        course.progress = newProgress;
        
        // Update UI
        const progressBar = document.querySelectorAll('.course-progress-fill')[courseIndex];
        const progressText = document.querySelectorAll('.course-progress-text')[courseIndex];
        
        progressBar.style.width = ${newProgress}%;
        progressText.textContent = ${newProgress}% Complete;
        
        this.showNotification(Progress updated: ${newProgress}%);
        
        if (newProgress === 100) {
            this.showNotification(🎉 Congratulations! You've completed ${course.title}!);
            this.updateStats();
        }
    }

    addChatMessage(message) {
        const chatMessages = document.querySelector('.chat-messages');
        
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <div class="message-avatar">AJ</div>
            <div>
                <div class="message-content">${message}</div>
                <div class="message-time">just now</div>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate response
        setTimeout(() => {
            this.addInstructorResponse();
        }, 1000 + Math.random() * 2000);
    }

    addInstructorResponse() {
        const responses = [
            "Thanks for your message! I'll get back to you soon.",
            "Great question! Let me help you with that.",
            "Keep up the good work!",
            "I'm here if you need any assistance.",
            "That's a great observation!"
        ];
        
        const chatMessages = document.querySelector('.chat-messages');
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <div class="message-avatar">SC</div>
            <div>
                <div class="message-content">${randomResponse}</div>
                <div class="message-time">just now</div>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    handleQuickAction(action) {
        switch(action) {
            case 'Add New Course':
                this.showAddCourseModal();
                break;
            case 'Find Study Partner':
                this.showStudyPartnerModal();
                break;
            case 'Schedule Session':
                this.showScheduleModal();
                break;
            case 'Set Learning Goal':
                this.showGoalModal();
                break;
            case 'View Progress':
                this.showProgressModal();
                break;
            default:
                this.showNotification(${action} feature coming soon!);
        }
    }

    showAddCourseModal() {
        const modal = this.createModal(`
            <div class="add-course-modal">
                <h2>Add New Course</h2>
                <form id="addCourseForm">
                    <div class="form-group">
                        <label for="courseTitle">Course Title</label>
                        <input type="text" id="courseTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="courseInstructor">Instructor</label>
                        <input type="text" id="courseInstructor" required>
                    </div>
                    <div class="form-group">
                        <label for="courseCategory">Category</label>
                        <select id="courseCategory" required>
                            <option value="">Select Category</option>
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="courseDescription">Description</label>
                        <textarea id="courseDescription" required></textarea>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">Add Course</button>
                        <button type="button" class="btn-secondary" onclick="skillswap.closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        `);
        
        document.body.appendChild(modal);
        
        // Handle form submission
        document.getElementById('addCourseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewCourse();
        });
    }

    addNewCourse() {
        const title = document.getElementById('courseTitle').value;
        const instructor = document.getElementById('courseInstructor').value;
        const category = document.getElementById('courseCategory').value;
        const description = document.getElementById('courseDescription').value;
        
        const newCourse = {
            id: this.courses.length + 1,
            title,
            instructor,
            rating: 4.5,
            description,
            progress: 0,
            category
        };
        
        this.courses.push(newCourse);
        this.showNotification(Course "${title}" added successfully!);
        this.closeModal();
        this.refreshCourseGrid();
    }

    showNotificationsPanel() {
        const modal = this.createModal(`
            <div class="notifications-panel">
                <h2>Notifications</h2>
                <div class="notification-list">
                    <div class="notification-item">
                        <div class="notification-icon">🎉</div>
                        <div class="notification-content">
                            <h4>Course Completed!</h4>
                            <p>You've completed "JavaScript Fundamentals"</p>
                            <span class="notification-time">2 hours ago</span>
                        </div>
                    </div>
                    <div class="notification-item">
                        <div class="notification-icon">💬</div>
                        <div class="notification-content">
                            <h4>New Message</h4>
                            <p>Sarah Chen sent you a message</p>
                            <span class="notification-time">1 hour ago</span>
                        </div>
                    </div>
                    <div class="notification-item">
                        <div class="notification-icon">📅</div>
                        <div class="notification-content">
                            <h4>Upcoming Session</h4>
                            <p>Live session starts in 30 minutes</p>
                            <span class="notification-time">30 min ago</span>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="skillswap.markAllAsRead()">Mark All as Read</button>
                    <button class="btn-secondary" onclick="skillswap.closeModal()">Close</button>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
        
        // Reset notification badge
        this.notifications = 0;
        this.updateNotificationBadge();
    }

    // Utility methods
    createModal(content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="skillswap.closeModal()">×</button>
                ${content}
            </div>
        `;
        
        // Add styles if not already present
        if (!document.querySelector('#modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'modal-styles';
            styles.textContent = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    position: relative;
                }
                
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                
                .form-group {
                    margin-bottom: 1rem;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: bold;
                }
                
                .form-group input,
                .form-group select,
                .form-group textarea {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                
                .form-group textarea {
                    height: 100px;
                    resize: vertical;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .btn-primary, .btn-secondary {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .btn-primary {
                    background: #007bff;
                    color: white;
                }
                
                .btn-secondary {
                    background: #6c757d;
                    color: white;
                }
                
                .notification-list {
                    max-height: 400px;
                    overflow-y: auto;
                }
                
                .notification-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    border-bottom: 1px solid #eee;
                }
                
                .notification-icon {
                    font-size: 1.5rem;
                }
                
                .notification-content h4 {
                    margin: 0 0 0.5rem 0;
                }
                
                .notification-time {
                    color: #666;
                    font-size: 0.9rem;
                }
            `;
            document.head.appendChild(styles);
        }
        
        return modal;
    }

    closeModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'toast-notification';
        notification.textContent = message;
        
        // Add styles if not already present
        if (!document.querySelector('#toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = `
                .toast-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #333;
                    color: white;
                    padding: 1rem;
                    border-radius: 4px;
                    z-index: 1001;
                    animation: slideIn 0.3s ease-out;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    updateTimeStamps() {
        const timeElements = document.querySelectorAll('.message-time');
        
        timeElements.forEach((element, index) => {
            if (this.messages[index]) {
                element.textContent = this.formatTimeAgo(this.messages[index].timestamp);
            }
        });
    }

    formatTimeAgo(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        
        if (minutes < 1) return 'just now';
        if (minutes < 60) return ${minutes} min ago;
        if (hours < 24) return ${hours} hour${hours > 1 ? 's' : ''} ago;
        
        return timestamp.toLocaleDateString();
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.course-progress-fill');
        
        progressBars.forEach((bar, index) => {
            const targetWidth = this.courses[index].progress;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-out';
                bar.style.width = ${targetWidth}%;
            }, index * 200);
        });
    }

    animatePageTransition() {
        const mainContent = document.querySelector('.main-content');
        mainContent.style.opacity = '0.7';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 300);
    }

    updateStats() {
        const completedCourses = this.courses.filter(course => course.progress === 100).length;
        const statNumber = document.querySelector('.stat-number');
        if (statNumber) {
            statNumber.textContent = completedCourses;
        }
    }

    updateNotificationBadge() {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = this.notifications;
            badge.style.display = this.notifications > 0 ? 'block' : 'none';
        }
    }

    getInstructorByAvatar(avatar) {
        const instructorMap = {
            'SC': 'Sarah Chen',
            'MR': 'Michael Rodriguez',
            'EW': 'Dr. Emily Watson',
            'JT': 'James Thompson'
        };
        return instructorMap[avatar];
    }

    // Additional methods for extended functionality
    continueCourse(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (course) {
            this.showNotification(Continuing ${course.title}...);
            this.closeModal();
        }
    }

    markAllAsRead() {
        this.notifications = 0;
        this.updateNotificationBadge();
        this.showNotification('All notifications marked as read');
        this.closeModal();
    }

    refreshCourseGrid() {
        // In a real app, this would re-render the course grid
        this.showNotification('Course grid updated');
    }

    showStudyPartnerModal() {
        const modal = this.createModal(`
            <div class="study-partner-modal">
                <h2>Find Study Partner</h2>
                <p>Connect with other learners in your courses:</p>
                <div class="partner-list">
                    <div class="partner-item">
                        <div class="partner-avatar">JD</div>
                        <div class="partner-info">
                            <h4>John Doe</h4>
                            <p>Also studying Advanced JavaScript</p>
                        </div>
                        <button class="btn-primary">Connect</button>
                    </div>
                    <div class="partner-item">
                        <div class="partner-avatar">AS</div>
                        <div class="partner-info">
                            <h4>Alice Smith</h4>
                            <p>UI/UX Design enthusiast</p>
                        </div>
                        <button class="btn-primary">Connect</button>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" onclick="skillswap.closeModal()">Close</button>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    showScheduleModal() {
        const modal = this.createModal(`
            <div class="schedule-modal">
                <h2>Schedule Session</h2>
                <form id="scheduleForm">
                    <div class="form-group">
                        <label for="sessionType">Session Type</label>
                        <select id="sessionType" required>
                            <option value="">Select Type</option>
                            <option value="1-on-1">1-on-1 Tutoring</option>
                            <option value="group">Group Study</option>
                            <option value="workshop">Workshop</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="sessionDate">Date</label>
                        <input type="date" id="sessionDate" required>
                    </div>
                    <div class="form-group">
                        <label for="sessionTime">Time</label>
                        <input type="time" id="sessionTime" required>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">Schedule</button>
                        <button type="button" class="btn-secondary" onclick="skillswap.closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    showGoalModal() {
        const modal = this.createModal(`
            <div class="goal-modal">
                <h2>Set Learning Goal</h2>
                <form id="goalForm">
                    <div class="form-group">
                        <label for="goalTitle">Goal Title</label>
                        <input type="text" id="goalTitle" placeholder="e.g., Complete JavaScript course" required>
                    </div>
                    <div class="form-group">
                        <label for="goalDeadline">Target Date</label>
                        <input type="date" id="goalDeadline" required>
                    </div>
                    <div class="form-group">
                        <label for="goalDescription">Description</label>
                        <textarea id="goalDescription" placeholder="Describe your learning goal..."></textarea>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">Set Goal</button>
                        <button type="button" class="btn-secondary" onclick="skillswap.closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    showProgressModal() {
        const modal = this.createModal(`
            <div class="progress-modal">
                <h2>Learning Progress</h2>
                <div class="progress-summary">
                    <div class="progress-stat">
                        <h3>Overall Progress</h3>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 65%"></div>
                        </div>
                        <p>65% Complete</p>
                    </div>
                    <div class="progress-breakdown">
                        <h3>Course Breakdown</h3>
                        ${this.courses.map(course => `
                            <div class="course-progress-item">
                                <span>${course.title}</span>
                                <span>${course.progress}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" onclick="skillswap.closeModal()">Close</button>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.skillswap = new SkillSwapDashboard();
});

// Global function for the floating button (if needed)
function showAddCourseModal() {
    if (window.skillswap) {
        window.skillswap.showAddCourseModal();
    }
}