// Action phrase and icon mapping
export const eventTypeMap: Record<
    string,
    { actionPhrase: string; icon: string }
> = {
    pull_opened: { actionPhrase: "opened pull request", icon: "github" },
    pull_merged: { actionPhrase: "merged pull request", icon: "github" },
    pull_closed: { actionPhrase: "closed pull request", icon: "github" },
    issue_opened: { actionPhrase: "opened issue", icon: "github" },
    issue_closed: { actionPhrase: "closed issue", icon: "github" },
    issue_reopened: { actionPhrase: "reopened issue", icon: "github" },
    commit: { actionPhrase: "pushed commit", icon: "github" },
    release_published: { actionPhrase: "published release", icon: "github" },
    workflow_run: { actionPhrase: "workflow completed", icon: "github" },
    repo_created: { actionPhrase: "created repository", icon: "github" },
    repo_archived: { actionPhrase: "archived repository", icon: "github" },
};

// Helper to convert snake_case to human readable
export function snakeCaseToWords(str: string): string {
    return str
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

// Helper to get action phrase and icon
export function getEventInfo(type: string) {
    if (eventTypeMap[type]) {
        return eventTypeMap[type];
    }
    // Fallback
    return {
        actionPhrase: snakeCaseToWords(type),
        icon: "github",
    };
}

// Helper to truncate title
export function truncateTitle(title: string, maxLength: number = 45): string {
    if (title.length <= maxLength) return title;
    return title.slice(0, maxLength).trim() + "…";
}

// Helper to format date
export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const currentYear = now.getFullYear();
    const eventYear = date.getFullYear();

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');

    if (eventYear !== currentYear) {
        return `${month} ${day}, ${eventYear}`;
    }
    return `${month} ${day}`;
}

// Helper to extract project name from project_id
export function getProjectName(projectId: string): string {
    return projectId.split("/")[1] || projectId;
}

// Types for organized events
export interface OrganizedEvents {
    eventsByProject: Array<{
        project: any;
        events: any[];
        remainingEvents: any[];
    }>;
    regularEvents: any[];
}

/**
 * Organizes GitHub events into featured project sections and regular activity
 * @param events - Array of GitHub events
 * @param projectData - Project data containing featured projects
 * @returns Organized events structure
 */
export function organizeEvents(
    events: any[],
    projectData: any
): OrganizedEvents {
    // Sort events by date (newest first)
    const sortedEvents = [...events].sort(
        (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
    );

    // Get featured projects
    const featuredProjects = projectData.projects.filter(
        (project: any) => project.featured
    );
    const featuredProjectIds = featuredProjects.map((project: any) => project.id);

    // Separate events into featured and regular
    const allFeaturedEvents = sortedEvents.filter((event) =>
        featuredProjectIds.includes(event.project_id)
    );

    // Group featured events by project and split into top 3 and rest
    const eventsByProject = featuredProjectIds.map((projectId: string) => {
        const projectEvents = allFeaturedEvents.filter(
            (event) => event.project_id === projectId
        );
        return {
            project: featuredProjects.find((p: any) => p.id === projectId)!,
            events: projectEvents.slice(0, 3), // Latest 3 for featured section
            remainingEvents: projectEvents.slice(3), // Rest for regular section
        };
    });

    // Collect all remaining events (non-featured + remaining from featured projects)
    const remainingFeaturedEvents = eventsByProject.flatMap(
        (item: { remainingEvents: any[] }) => item.remainingEvents
    );
    const nonFeaturedEvents = sortedEvents.filter(
        (event) => !featuredProjectIds.includes(event.project_id)
    );

    // Combine and sort all regular events
    const regularEvents = [...remainingFeaturedEvents, ...nonFeaturedEvents].sort(
        (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
    );

    return {
        eventsByProject,
        regularEvents,
    };
}

/**
 * Groups events by time periods (Last Week, Last Month, Earlier)
 * @param events - Array of events to group
 * @returns Object with events grouped by time period
 */
export function groupEventsByTimePeriod(events: any[]): {
    lastWeek: any[];
    lastMonth: any[];
    earlier: any[];
} {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const lastWeek: any[] = [];
    const lastMonth: any[] = [];
    const earlier: any[] = [];

    events.forEach((event) => {
        const eventDate = new Date(event.at);

        if (eventDate >= oneWeekAgo) {
            lastWeek.push(event);
        } else if (eventDate >= oneMonthAgo) {
            lastMonth.push(event);
        } else {
            earlier.push(event);
        }
    });

    return {
        lastWeek,
        lastMonth,
        earlier,
    };
}

/**
 * Groups events by week and counts activities per project
 * @param events - Array of events to group
 * @returns Array of weekly summaries with project counts
 */
export function groupEventsByWeek(events: any[]): Array<{
    weekStart: Date;
    weekEnd: Date;
    events: any[];
    projectCounts: Record<string, number>;
}> {
    if (events.length === 0) return [];

    // Sort events by date (oldest first for grouping)
    const sortedEvents = [...events].sort(
        (a, b) => new Date(a.at).getTime() - new Date(b.at).getTime()
    );

    const weeks: Array<{
        weekStart: Date;
        weekEnd: Date;
        events: any[];
        projectCounts: Record<string, number>;
    }> = [];

    let currentWeekStart: Date | null = null;
    let currentWeekEnd: Date | null = null;
    let currentWeekEvents: any[] = [];

    sortedEvents.forEach((event) => {
        const eventDate = new Date(event.at);

        if (!currentWeekStart) {
            // Start first week
            currentWeekStart = getWeekStart(eventDate);
            currentWeekEnd = getWeekEnd(currentWeekStart);
            currentWeekEvents = [event];
        } else if (eventDate <= currentWeekEnd!) {
            // Event belongs to current week
            currentWeekEvents.push(event);
        } else {
            // Event belongs to next week, save current week and start new one
            const projectCounts = countProjectActivities(currentWeekEvents);
            weeks.push({
                weekStart: currentWeekStart,
                weekEnd: currentWeekEnd!,
                events: currentWeekEvents,
                projectCounts,
            });

            currentWeekStart = getWeekStart(eventDate);
            currentWeekEnd = getWeekEnd(currentWeekStart);
            currentWeekEvents = [event];
        }
    });

    // Save last week
    if (currentWeekStart && currentWeekEvents.length > 0) {
        const projectCounts = countProjectActivities(currentWeekEvents);
        weeks.push({
            weekStart: currentWeekStart,
            weekEnd: currentWeekEnd!,
            events: currentWeekEvents,
            projectCounts,
        });
    }

    // Reverse to show newest weeks first
    return weeks.reverse();
}

/**
 * Gets the start of the week (Sunday) for a given date
 */
function getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day; // adjust to Sunday
    return new Date(d.setDate(diff));
}

/**
 * Gets the end of the week (Saturday) for a given week start
 */
function getWeekEnd(weekStart: Date): Date {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    return weekEnd;
}

/**
 * Counts activities per project from an array of events
 */
function countProjectActivities(events: any[]): Record<string, number> {
    const counts: Record<string, number> = {};

    events.forEach((event) => {
        const projectName = getProjectName(event.project_id);
        counts[projectName] = (counts[projectName] || 0) + 1;
    });

    return counts;
}

/**
 * Formats a week range for display
 */
export function formatWeekRange(weekStart: Date, weekEnd: Date): string {
    const now = new Date();
    const currentYear = now.getFullYear();

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const startMonth = monthNames[weekStart.getMonth()];
    const startDay = weekStart.getDate().toString().padStart(2, '0');
    const endMonth = monthNames[weekEnd.getMonth()];
    const endDay = weekEnd.getDate().toString().padStart(2, '0');
    const year = weekStart.getFullYear();

    // Always show full format: "Mon DD - Mon DD" or "Mon DD - Mon DD, YYYY"
    if (year !== currentYear) {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
}
