import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  avatar?: string;
  businessType?: string;
  createdAt: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('lucrofacil_user');
    const storedAuth = localStorage.getItem('lucrofacil_auth');
    
    if (storedUser && storedAuth === 'true') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('lucrofacil_user');
        localStorage.removeItem('lucrofacil_auth');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users: StoredUser[] = JSON.parse(localStorage.getItem('lucrofacil_users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) throw new Error('E-mail ou senha inválidos');
      
      const { password: _, ...userWithoutPassword } = foundUser;
      
      localStorage.setItem('lucrofacil_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('lucrofacil_auth', 'true');
      setUser(userWithoutPassword);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users: StoredUser[] = JSON.parse(localStorage.getItem('lucrofacil_users') || '[]');
      
      if (users.some(u => u.email === email)) {
        throw new Error('Este e-mail já está cadastrado');
      }
      
      const newUser: StoredUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('lucrofacil_users', JSON.stringify(users));
      
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('lucrofacil_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('lucrofacil_auth', 'true');
      setUser(userWithoutPassword);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('lucrofacil_user');
    localStorage.removeItem('lucrofacil_auth');
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    
    // Atualizar no localStorage
    localStorage.setItem('lucrofacil_user', JSON.stringify(updatedUser));
    
    // Atualizar também na lista de usuários
    const users: StoredUser[] = JSON.parse(localStorage.getItem('lucrofacil_users') || '[]');
    const updatedUsers = users.map((u: StoredUser) => 
      u.id === user.id ? { ...u, ...data } : u
    );
    localStorage.setItem('lucrofacil_users', JSON.stringify(updatedUsers));
    
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
