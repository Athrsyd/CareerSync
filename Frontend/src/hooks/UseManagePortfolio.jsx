import { useState } from 'react'
import API from '../services/api'

const useManagePortfolio = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const [portfolioId, setPortfolioId] = useState('')

    const initialFormData = {
        fullname: '',
        about_me: '',
        address: '',
        photo: null,
        education: '',
        hobbies: '',
        experience: '',
        email: '',
        linkedin_link: '',
        instagram_link: '',
        phone_number: '',
        career_id: '',
        user_id: '',
        style: 'style1'
    }

    /**
     * Build FormData dari object formData.
     * Field string selalu dikirim (termasuk yang kosong) supaya BE tidak
     * raise 422 "field required" untuk field yang nullable.
     */
    const buildFormData = (formData, includeMethod = null) => {
        const data = new FormData()

        // Field yang wajib selalu terkirim meskipun kosong
        const stringFields = [
            'fullname', 'about_me', 'address', 'education',
            'hobbies', 'experience', 'email', 'phone_number',
            'linkedin_link', 'instagram_link', 'github_link',
            'career_id', 'user_id', 'style'
        ]

        stringFields.forEach(key => {
            // Kirim string kosong kalau null/undefined, supaya BE tahu field ini ada
            const val = formData[key] ?? ''
            if (val !== null) {
                data.append(key, String(val))
            }
        })

        if (formData.photo && formData.photo instanceof File) {
            data.append('photo', formData.photo)
        }

        if (includeMethod) {
            data.append('_method', includeMethod)
        }

        return data
    }

    const submitPortfolio = async (formData) => {
        setLoading(true)
        setError('')

        try {
            const token = localStorage.getItem('tokenCareerSync')
            const data = buildFormData(formData)

            const response = await API.post('/portfolio', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })

            setPortfolioId(response.data.data?.id || response.data.data?.portfolio_id || '')
            setShowSuccess(true)
            return true
        } catch (err) {
            const msg = err.response?.data?.message
            if (msg && typeof msg === 'object') {
                // Validasi errors — ambil pesan pertama dari tiap field
                const first = Object.values(msg).flat()[0]
                setError(first || 'Terjadi kesalahan validasi')
            } else {
                setError(msg || err.message || 'Gagal membuat portfolio')
            }
            console.error('Error creating portfolio:', err.response?.data || err)
            return false
        } finally {
            setLoading(false)
        }
    }

    const fetchPortfolioByUsername = async (username) => {
        if (!username) return null
        try {
            const response = await API.get(`/portfolio/${username}`)
            return response.data.data || null
        } catch {
            return null
        }
    }

    const updatePortfolio = async (formData, portfolioId) => {
        setLoading(true)
        setError('')

        try {
            const token = localStorage.getItem('tokenCareerSync')
            const data = buildFormData(formData, 'PUT')

            const response = await API.post(`/portfolio/${portfolioId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })

            setPortfolioId(portfolioId)
            setShowSuccess(true)
            return true
        } catch (err) {
            const msg = err.response?.data?.message
            if (msg && typeof msg === 'object') {
                const first = Object.values(msg).flat()[0]
                setError(first || 'Terjadi kesalahan validasi')
            } else {
                setError(msg || err.message || 'Gagal memperbarui portfolio')
            }
            console.error('Error updating portfolio:', err.response?.data || err)
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        showSuccess,
        portfolioId,
        initialFormData,
        submitPortfolio,
        fetchPortfolioByUsername,
        updatePortfolio,
        setShowSuccess,
        setError
    }
}

export default useManagePortfolio