export interface Announcement {
  noticeId: number;
  title: string;
  authorName: string;
  createdAt: string;
}

export interface AnnouncementDetail extends Announcement {
  content: string;
}
