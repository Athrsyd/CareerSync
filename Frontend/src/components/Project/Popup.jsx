import React from 'react'
import { Loader2 } from 'lucide-react'

const Popup = ({ currentProject, setShowModal, handleSubmitProject, loading }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-fadeIn">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800">
                    Konfirmasi Penyelesaian Project
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Apakah Anda yakin ingin menyelesaikan project{' '}
                    <span className="font-semibold text-gray-800">"{currentProject?.title}"</span>?
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
                    <p className="text-xs sm:text-sm text-amber-700">
                        ⚠️ Setelah dikonfirmasi, project ini tidak dapat diubah dan akan masuk ke histori Anda.
                    </p>
                </div>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => setShowModal(false)}
                        disabled={loading}
                        className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors duration-200 text-sm disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmitProject}
                        disabled={loading}
                        className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors duration-200 text-sm disabled:opacity-60 flex items-center gap-2"
                    >
                        {loading && <Loader2 size={15} className="animate-spin" />}
                        {loading ? 'Memproses...' : 'Konfirmasi'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Popup
