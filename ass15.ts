// 1. Base Class – User
class User {
    public id: number;
    public name: string;
    public email: string;
    private _password: string;
    protected phone: string;
    private _age: number;

    constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this._password = password;
        this.phone = phone;

        if (age >= 18 && age <= 60) {
            this._age = age;
        } else {
            throw new Error("Age must be between 18 and 60.");
        }
    }

    public displayInfo(): void {
        console.log(`User: ${this.name}, Email: ${this.email}`);
    }
}

// 2. Inheritance - Admin User
class Admin extends User {
    public manageNotes(): void {
        console.log("Admin is managing notes...");
    }
}

// 3. Class - Note
class Note {
    public id: number;
    public title: string;
    public content: string;
    public userId: User; // 6. Association

    constructor(id: number, title: string, content: string, author: User) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = author;
    }

    public preview(): string {
        return this.content.substring(0, 20) + "...";
    }
}

// 4. Composition - NoteBook and Notes
class NoteBook {
    private notes: Note[] = [];

    // Composition: NoteBook creates and owns the lifecycle of its Notes
    public addNote(id: number, title: string, content: string, user: User): void {
        const newNote = new Note(id, title, content, user);
        this.notes.push(newNote);
    }

    public removeNote(id: number): void {
        this.notes = this.notes.filter(note => note.id !== id);
    }
}

// 5. Aggregation – User and Notebook
class UserProfile extends User {
    private notebooks: NoteBook[] = [];

    // Aggregation: Notebooks exist independently but are owned by a User
    public addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }
}

// 7. Generics - Data Storage
class Storage<T> {
    private items: T[] = [];

    public addItem(item: T): void {
        this.items.push(item);
    }

    public removeItem(item: T): void {
        this.items = this.items.filter(i => i !== item);
    }

    public getAllItems(): T[] {
        return this.items;
    }
}