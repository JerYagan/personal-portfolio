import { parseMarkdown } from '../utils/markdownParser';

// Dynamic eager glob import from content directory via Vite query: ?raw
const contentFiles = import.meta.glob('/content/**/*.md', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string }>;

export interface ProfileData {
  name: string;
  role: string;
  availability: string;
  focus: string[];
  principle: string;
  currentlyBuilding: string;
  bioShort: string;
  bioDescription: string;
  aboutIntro: string;
  aboutSub: string;
  currentFocusDetails: string;
  portraitUrl: string;
  resumeUrl: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface SkillCategory {
  title: string;
  skills: string;
}

export interface SkillsData {
  categories: SkillCategory[];
}

export interface ExperienceRole {
  period: string;
  company: string;
  role: string;
  text: string;
  tech: string[];
}

export interface ExperienceData {
  roles: ExperienceRole[];
}

export interface ProjectGalleryItem {
  label: string;
  url: string;
}

export interface ProjectArchitecture {
  client: string;
  clientExtra?: string;
  data: string;
  dataExtra?: string;
  delivery: string;
  summary: string;
}

export interface ProjectLearning {
  challenge: string;
  lesson: string;
}

export interface ProjectData {
  title: string;
  type: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  featured: boolean;
  slug: string;
  role: string;
  timeline: string;
  team: string;
  status: string;
  subtitle: string;
  appUrl: string;
  demo?: string;
  github?: string;
  gallery?: ProjectGalleryItem[];
  architecture?: ProjectArchitecture[];
  learnings?: ProjectLearning[];
}

export function getProfile(): ProfileData {
  const file = contentFiles['/content/profile.md'];
  if (!file) throw new Error('profile.md not found');
  const { data } = parseMarkdown<ProfileData>(file.default);
  return data;
}

export function getSkills(): SkillsData {
  const file = contentFiles['/content/skills.md'];
  if (!file) throw new Error('skills.md not found');
  const { data } = parseMarkdown<SkillsData>(file.default);
  return data;
}

export function getExperience(): ExperienceData {
  const file = contentFiles['/content/experience.md'];
  if (!file) throw new Error('experience.md not found');
  const { data } = parseMarkdown<ExperienceData>(file.default);
  return data;
}

export function getProjects(): ProjectData[] {
  const projects: ProjectData[] = [];
  
  for (const path in contentFiles) {
    if (path.startsWith('/content/projects/')) {
      const file = contentFiles[path];
      const parsed = parseMarkdown<ProjectData>(file.default);
      // Combine parsed frontmatter data
      projects.push(parsed.data);
    }
  }
  
  // Sort projects by year descending
  return projects.sort((a, b) => String(b.year).localeCompare(String(a.year)));
}

export function getProjectBySlug(slug: string): { data: ProjectData; content: string } | null {
  for (const path in contentFiles) {
    if (path.startsWith('/content/projects/')) {
      const file = contentFiles[path];
      const parsed = parseMarkdown<ProjectData>(file.default);
      if (parsed.data.slug === slug) {
        // Special manual parsing helper for subsections (Overview, problem/solution, features)
        return {
          data: parsed.data,
          content: parsed.content,
        };
      }
    }
  }
  return null;
}
