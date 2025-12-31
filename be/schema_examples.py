"""
Database Schema Examples for Common Use Cases

This file contains example schemas and patterns for typical applications.
Copy and modify these examples for your specific needs.
"""

from datetime import datetime
from database import create_document, get_documents, update_document, delete_document

# =============================================================================
# USER MANAGEMENT SCHEMA
# =============================================================================

def create_user(name: str, email: str, password_hash: str):
    """Create a new user"""
    user_data = {
        "name": name,
        "email": email,
        "password_hash": password_hash,
        "profile": {
            "avatar_url": None,
            "bio": "",
            "location": ""
        },
        "settings": {
            "email_notifications": True,
            "dark_mode": False
        },
        "status": "active"
    }
    return create_document("users", user_data)

def get_user_by_email(email: str):
    """Get user by email"""
    users = get_documents("users", {"email": email})
    return users[0] if users else None

# =============================================================================
# BLOG/CMS SCHEMA
# =============================================================================

def create_blog_post(title: str, content: str, author_id: str, tags: list = None):
    """Create a blog post"""
    post_data = {
        "title": title,
        "content": content,
        "author_id": author_id,
        "slug": title.lower().replace(" ", "-"),
        "tags": tags or [],
        "status": "draft",
        "view_count": 0,
        "likes": 0,
        "comments": []
    }
    return create_document("posts", post_data)

def add_comment_to_post(post_id: str, author_id: str, comment_text: str):
    """Add comment to a blog post"""
    from bson import ObjectId
    
    comment = {
        "id": str(ObjectId()),
        "author_id": author_id,
        "text": comment_text,
        "created_at": datetime.utcnow(),
        "likes": 0
    }
    
    # Add comment to post's comments array
    from database import db
    result = db.posts.update_one(
        {"_id": ObjectId(post_id)},
        {"$push": {"comments": comment}}
    )
    return result.modified_count > 0

# =============================================================================
# E-COMMERCE SCHEMA
# =============================================================================

def create_product(name: str, price: float, description: str, category: str):
    """Create a product"""
    product_data = {
        "name": name,
        "price": price,
        "description": description,
        "category": category,
        "sku": f"PROD-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "inventory": {
            "stock": 0,
            "reserved": 0,
            "available": 0
        },
        "images": [],
        "attributes": {},
        "status": "active",
        "rating": {
            "average": 0.0,
            "count": 0
        }
    }
    return create_document("products", product_data)

def create_order(user_id: str, items: list, shipping_address: dict):
    """Create an order"""
    total_amount = sum(item["price"] * item["quantity"] for item in items)
    
    order_data = {
        "user_id": user_id,
        "order_number": f"ORD-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "items": items,
        "total_amount": total_amount,
        "shipping_address": shipping_address,
        "status": "pending",
        "payment": {
            "method": None,
            "status": "pending",
            "transaction_id": None
        },
        "tracking": {
            "carrier": None,
            "tracking_number": None,
            "status": "processing"
        }
    }
    return create_document("orders", order_data)

# =============================================================================
# TASK/PROJECT MANAGEMENT SCHEMA
# =============================================================================

def create_project(name: str, description: str, owner_id: str):
    """Create a project"""
    project_data = {
        "name": name,
        "description": description,
        "owner_id": owner_id,
        "members": [owner_id],
        "status": "active",
        "progress": 0,
        "due_date": None,
        "tags": [],
        "settings": {
            "is_public": False,
            "allow_comments": True
        }
    }
    return create_document("projects", project_data)

def create_task(project_id: str, title: str, description: str, assignee_id: str = None):
    """Create a task"""
    task_data = {
        "project_id": project_id,
        "title": title,
        "description": description,
        "assignee_id": assignee_id,
        "status": "todo",  # todo, in_progress, done
        "priority": "medium",  # low, medium, high, urgent
        "labels": [],
        "due_date": None,
        "time_tracking": {
            "estimated_hours": 0,
            "logged_hours": 0
        },
        "checklist": [],
        "attachments": []
    }
    return create_document("tasks", task_data)

# =============================================================================
# CHAT/MESSAGING SCHEMA
# =============================================================================

def create_chat_room(name: str, type: str = "group", members: list = None):
    """Create a chat room"""
    room_data = {
        "name": name,
        "type": type,  # direct, group, channel
        "members": members or [],
        "admins": [],
        "settings": {
            "is_private": False,
            "allow_file_sharing": True,
            "message_retention_days": 30
        },
        "last_activity": datetime.utcnow()
    }
    return create_document("chat_rooms", room_data)

def send_message(room_id: str, sender_id: str, content: str, message_type: str = "text"):
    """Send a message to a chat room"""
    message_data = {
        "room_id": room_id,
        "sender_id": sender_id,
        "content": content,
        "type": message_type,  # text, image, file, system
        "reactions": {},
        "replies": [],
        "is_edited": False,
        "is_deleted": False
    }
    return create_document("messages", message_data)

# =============================================================================
# EVENT/BOOKING SCHEMA
# =============================================================================

def create_event(title: str, description: str, start_time: datetime, end_time: datetime, location: str):
    """Create an event"""
    event_data = {
        "title": title,
        "description": description,
        "start_time": start_time,
        "end_time": end_time,
        "location": location,
        "organizer_id": None,
        "attendees": [],
        "capacity": None,
        "price": 0.0,
        "status": "published",  # draft, published, cancelled
        "categories": [],
        "images": [],
        "settings": {
            "registration_required": False,
            "allow_waitlist": False,
            "send_reminders": True
        }
    }
    return create_document("events", event_data)

def create_booking(event_id: str, user_id: str, ticket_quantity: int = 1):
    """Create a booking for an event"""
    booking_data = {
        "event_id": event_id,
        "user_id": user_id,
        "ticket_quantity": ticket_quantity,
        "booking_reference": f"BOOK-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "status": "confirmed",  # pending, confirmed, cancelled
        "payment": {
            "amount": 0.0,
            "status": "pending",
            "method": None
        },
        "attendee_details": [],
        "special_requirements": ""
    }
    return create_document("bookings", booking_data)

# =============================================================================
# ANALYTICS/TRACKING SCHEMA
# =============================================================================

def track_user_activity(user_id: str, action: str, resource_type: str, resource_id: str, metadata: dict = None):
    """Track user activity for analytics"""
    activity_data = {
        "user_id": user_id,
        "action": action,  # view, create, update, delete, login, etc.
        "resource_type": resource_type,  # post, product, user, etc.
        "resource_id": resource_id,
        "metadata": metadata or {},
        "ip_address": None,
        "user_agent": None,
        "session_id": None,
        "timestamp": datetime.utcnow()
    }
    return create_document("user_activities", activity_data)

def track_page_view(page_path: str, user_id: str = None, session_id: str = None):
    """Track page views for analytics"""
    pageview_data = {
        "page_path": page_path,
        "user_id": user_id,
        "session_id": session_id,
        "referrer": None,
        "viewport": {
            "width": None,
            "height": None
        },
        "device_info": {
            "type": None,  # desktop, mobile, tablet
            "os": None,
            "browser": None
        },
        "timestamp": datetime.utcnow()
    }
    return create_document("page_views", pageview_data)

# =============================================================================
# NOTIFICATION SCHEMA
# =============================================================================

def create_notification(user_id: str, title: str, message: str, type: str = "info"):
    """Create a notification"""
    notification_data = {
        "user_id": user_id,
        "title": title,
        "message": message,
        "type": type,  # info, success, warning, error
        "is_read": False,
        "action_url": None,
        "metadata": {}
    }
    return create_document("notifications", notification_data)

# =============================================================================
# USAGE EXAMPLES
# =============================================================================

if __name__ == "__main__":
    # Example usage - uncomment to test
    
    # Create a user
    # user_id = create_user("John Doe", "john@example.com", "hashed_password")
    
    # Create a blog post
    # post_id = create_blog_post("My First Post", "This is the content", user_id, ["tech", "python"])
    
    # Create a product
    # product_id = create_product("iPhone 15", 999.99, "Latest iPhone", "Electronics")
    
    # Track user activity
    # track_user_activity(user_id, "create", "post", post_id, {"category": "blog"})
    
    pass