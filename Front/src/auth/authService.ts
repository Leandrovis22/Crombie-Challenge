export const verifyToken = async (navigate: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return null;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'}/home`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        console.error(await response.json());
        localStorage.removeItem('token');
        navigate('/login');
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      navigate('/login');
      return null;
    }
  };