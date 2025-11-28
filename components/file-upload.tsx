"use client"

import React, { useState } from "react"
import { Upload, X, FileText, Loader } from "lucide-react"
import { toast } from "sonner"
import { UploadedFile } from "@/lib/types"
import { BACKEND_BASE_URL } from "@/lib/env"

interface FileUploadComponentProps {
  onFilesUploaded: (files: UploadedFile[]) => void
  uploadedFiles: UploadedFile[]
}

export default function FileUploadComponent({ onFilesUploaded, uploadedFiles }: FileUploadComponentProps) {
  const [isUploading, setIsUploading] = useState(false)

  const ALLOWED_TYPES = [
    "text/plain",
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  const isValidFileType = (file: File) => ALLOWED_TYPES.includes(file.type)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: UploadedFile[] = []
    setIsUploading(true)

    try {
      for (const file of Array.from(files)) {
        if (!isValidFileType(file)) {
          toast.error(`File type not allowed: ${file.name}`)
          continue
        }

        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch(`${BACKEND_BASE_URL}/files/temp-upload`, {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          toast.error(`Failed to upload ${file.name}`)
          continue
        }

        const data = await response.json()
        const tempUrl = data.temp_url || data.url

        newFiles.push({
          name: file.name,
          size: file.size,
          url: tempUrl,
          uploadedAt: new Date().toISOString(),
        })

        toast.success(`${file.name} uploaded successfully`)
      }

      if (newFiles.length > 0) {
        onFilesUploaded([...uploadedFiles, ...newFiles])
      }
    } catch (err: any) {
      toast.error("Failed to upload files")
      console.error(err)
    } finally {
      setIsUploading(false)
      // Reset input
      if (e.target) e.target.value = ""
    }
  }

  const handleRemoveFile = (fileUrl: string) => {
    const updated = uploadedFiles.filter((f) => f.url !== fileUrl)
    onFilesUploaded(updated)
    toast.success("File removed")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Upload Files (Optional)
        </label>
        <label className="flex items-center gap-4 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-500 transition-colors">
          <Upload size={24} className="text-gray-400" />
          <div>
            <p className="font-semibold text-gray-700">Browse or drag files here</p>
            <p className="text-sm text-gray-600">
              Supported: TXT, PDF, DOC, DOCX, JPG, PNG
            </p>
          </div>
          <input
            type="file"
            multiple
            accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {isUploading && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Loader size={16} className="animate-spin text-blue-600" />
          <span className="text-sm text-blue-700">Uploading files...</span>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">{uploadedFiles.length} file(s) uploaded</p>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.url}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText size={16} className="text-gray-500 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFile(file.url)}
                  className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded shrink-0"
                  type="button"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
