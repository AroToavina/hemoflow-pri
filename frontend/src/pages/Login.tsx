/**
 * Authentication Page - Login & Register
 * "Blood-Bright" Design
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { User, Lock, Mail, UserPlus, LogIn } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister 
        ? { nom: formData.username, email: formData.email, mot_de_passe: formData.password }
        : { email: formData.username, mot_de_passe: formData.password };

      const res = await api.post(endpoint, payload);
      
      if (!isRegister) {
        login(res.data.token, res.data.user);
        navigate("/dashboard");
      } else {
        // Après inscription, on bascule sur le login
        setIsRegister(false);
        setError("Compte créé avec succès ! Connectez-vous.");
      }
    } catch (err: any) {
      setError(err.response?.data?.msg || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663122008236/ZEkGTULVFmtLv59Gq5PjBA/hero-blood-donation-UxAq7jsGvR7t5xjQgwTZNx.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl border border-rule overflow-hidden animate-fade-in-up">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blood-50 rounded-2xl mb-4 shadow-lg shadow-blood-600/10">
              <UserPlus className="w-8 h-8 text-blood-600" />
            </div>
            <h1 className="text-3xl font-display font-extrabold text-ink mb-2">
              {isRegister ? "Créer un compte" : "Gestion HemoFlow"}
            </h1>
            <p className="text-ink-muted text-sm font-medium">
              {isRegister ? "Rejoignez le réseau de gestion du sang" : "Accès sécurisé administration"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mb-6 p-4 rounded-xl border-l-4 ${error.includes('succès') ? 'bg-green-50 border-green-500 text-green-700' : 'bg-blood-50 border-blood-500 text-blood-700'} text-sm font-medium`}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-ink font-semibold text-sm">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-muted" />
                <input
                  type="text"
                  placeholder="votre_nom"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-rule rounded-xl focus:ring-2 focus:ring-blood-600/20 focus:border-blood-600 outline-none transition-all"
                />
              </div>
            </div>

            {isRegister && (
              <div className="space-y-2">
                <label className="block text-ink font-semibold text-sm">
                  Email (Optionnel)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-muted" />
                  <input
                    type="email"
                    placeholder="email@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 border border-rule rounded-xl focus:ring-2 focus:ring-blood-600/20 focus:border-blood-600 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-ink font-semibold text-sm">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-muted" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-rule rounded-xl focus:ring-2 focus:ring-blood-600/20 focus:border-blood-600 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blood-600 hover:bg-blood-700 disabled:bg-blood-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blood-600/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="animate-pulse">Traitement...</span>
              ) : (
                <>
                  {isRegister ? <UserPlus className="size-4" /> : <LogIn className="size-4" />}
                  {isRegister ? "S'enregistrer" : "Se connecter"}
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-8 pt-6 border-t border-rule text-center">
            <button
              onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
              }}
              className="text-sm font-semibold text-ink-muted hover:text-blood-600 transition-colors"
            >
              {isRegister 
                ? "Déjà un compte ? Connectez-vous" 
                : "Pas encore de compte ? Créer un registre"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
