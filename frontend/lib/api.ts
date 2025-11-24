// frontend/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Internship {
  id: number;
  title: string;
  companyName: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  stipend: number;
  duration: string;
  applicationDeadline: string;
  isRemote: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InternshipFilters {
  page?: number;
  limit?: number;
  type?: string;
  location?: string;
  search?: string;
  company?: string;
}

export interface InternshipResponse {
  success: boolean;
  data: {
    internships: Internship[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface ApplicationData {
  studentName: string;
  email: string;
  phone?: string;
  coverLetter: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}

class ApiService {
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  }

  // Internship methods
  async getInternships(filters: InternshipFilters = {}): Promise<InternshipResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    return this.fetchWithAuth(`/internships?${params.toString()}`);
  }

  async getInternship(id: number) {
    return this.fetchWithAuth(`/internships/${id}`);
  }

  async applyForInternship(internshipId: number, data: ApplicationData) {
    return this.fetchWithAuth(`/internships/${internshipId}/apply`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Contact methods
  async submitContactForm(data: ContactData) {
    return this.fetchWithAuth('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();