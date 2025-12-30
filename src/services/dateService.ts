export function getNextExecutionDate(date: Date = new Date()): Date {
    const executionDate = new Date(date);
    const dayOfWeek = executionDate.getDay();

    if (dayOfWeek === 0) {
        executionDate.setDate(executionDate.getDate() + 1);
    } else if (dayOfWeek === 6) {
        executionDate.setDate(executionDate.getDate() + 2);
    }

    return executionDate;
}

export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}
