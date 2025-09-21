export const formatTimestamp = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

export const formatDuration = (duration: number) => {
  return `${duration}ms`;
};

export const getStatusColor = (statusCode: number) => {
  if (statusCode >= 200 && statusCode < 300) return 'text-green-600';
  if (statusCode >= 300 && statusCode < 400) return 'text-blue-600';
  if (statusCode >= 400 && statusCode < 500) return 'text-yellow-600';
  if (statusCode >= 500) return 'text-red-600';
  return 'text-gray-600';
};

export const getMethodColor = (method: string) => {
  switch (method.toUpperCase()) {
    case 'GET':
      return 'bg-green-100 text-green-800';
    case 'POST':
      return 'bg-blue-100 text-blue-800';
    case 'PUT':
      return 'bg-yellow-100 text-yellow-800';
    case 'DELETE':
      return 'bg-red-100 text-red-800';
    case 'PATCH':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
