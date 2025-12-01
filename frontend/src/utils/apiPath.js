export const API_PATHS = {
    AUTH:{
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        LOGOUT: "/api/auth/logout",
        GET_PROFILE: "/api/auth/profile",
        UPDATE_PROFILE: "/api/auth/update"
    },
    BOOKS:{
        CREATE_BOOK: "/api/books/create-book",
        GET_BOOK: "/api/books/get-books",
        GET_BOOK_BY_ID: "/api/books/get-book",
        UPDATE_BOOK: "/api/books/update-book",
        DELETE_BOOK: "/api/books/delete-book",
        UPDATE_COVER: "/api/books/update-coverimage"
    },
    AI:{
        GENERATE_OUTLINE: "/api/ai/generate-outline",
        GENERATE_CHAPTER_CONTENT: "/api/ai/generate-chapter-content",
    },
    EXPORT:{
        DOCX: "api/export"
    },
};

export const BASE_URL = "http://localhost:8000"

