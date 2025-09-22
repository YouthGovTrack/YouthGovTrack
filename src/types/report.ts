export interface CitizenReport {
  id: string;
  projectId: string;
  projectTitle: string;
  reporterName: string;
  reporterEmail: string;
  reportType: 'progress_update' | 'issue' | 'completion' | 'abandonment' | 'quality_concern';
  description: string;
  images: string[];
  location: {
    state: string;
    lga: string;
    address?: string;
  };
  status: 'pending' | 'verified' | 'investigating' | 'resolved';
  submitDate: string;
  verifiedBy?: string;
  adminNotes?: string;
}

export interface QuickReport {
  id: string;
  title: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: string;
  images: string[];
  reporterName: string;
  reporterEmail: string;
  submitDate: string;
  status: 'verified';
  verifiedBy: string;
  adminNotes?: string;
}
