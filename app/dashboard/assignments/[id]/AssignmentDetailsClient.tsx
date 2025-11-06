"use client"

import { useState } from "react"
import {
  UploadCloud,
  Users,
  Video,
  Image as ImageIcon,
  FileText,
  Wrench,
  Search,
  Trash2,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface FileItem {
  id: number
  icon: string
  name: string
  dateUploaded: string
  fileSize: string
  uploadedBy: string
}

interface CategoryItem {
  icon: React.ElementType
  name: string
  files: number
}

export default function AssignmentDetailsClient({ id }: { id: string }) {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const categories: CategoryItem[] = [
    { icon: Video, name: "Video", files: 16 },
    { icon: ImageIcon, name: "Image", files: 2140 },
    { icon: FileText, name: "Document", files: 24 },
    { icon: Wrench, name: "Installation Files", files: 16 },
  ]

  const files: FileItem[] = [
    {
      id: 1,
      icon: "/pdf-icon.png",
      name: "Tech requirements.pdf",
      dateUploaded: "Jan 4, 2022",
      fileSize: "200 KB",
      uploadedBy: "Olivia Rhye",
    },
    {
      id: 2,
      icon: "/jpg-icon.png",
      name: "Dashboard screenshot.jpg",
      dateUploaded: "Jan 4, 2022",
      fileSize: "720 KB",
      uploadedBy: "Phoenix Baker",
    },
    {
      id: 3,
      icon: "/pdf-icon.png",
      name: "User Interface Testing Report.pdf",
      dateUploaded: "Jan 4, 2022",
      fileSize: "200 KB",
      uploadedBy: "Olivia Rhye",
    },
    {
      id: 4,
      icon: "/pdf-icon.png",
      name: "Web UI Enhancement Plan.pdf",
      dateUploaded: "Jan 4, 2022",
      fileSize: "200 KB",
      uploadedBy: "Olivia Rhye",
    },
  ]

  const moreItems: FileItem[] = [
    {
      id: 1,
      icon: "/pdf-icon.png",
      name: "Tech requirements.pdf",
      dateUploaded: "Jan 4, 2022",
      fileSize: "200 KB",
      uploadedBy: "Olivia Rhye",
    },
    {
      id: 3,
      icon: "/pdf-icon.png",
      name: "User Interface Testing Report.pdf",
      dateUploaded: "Jan 4, 2022",
      fileSize: "200 KB",
      uploadedBy: "Olivia Rhye",
    },
    {
      id: 4,
      icon: "/pdf-icon.png",
      name: "Web UI Enhancement Plan.pdf",
      dateUploaded: "Jan 4, 2022",
      fileSize: "200 KB",
      uploadedBy: "Olivia Rhye",
    },
  ]

  return (
    <div className="flex-1 flex">
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">File Management Dashboard</h1>
            <p className="text-gray-600">Assignment ID: {id}</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Users size={16} />
            Invite Team
          </Button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8">
          <UploadCloud size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Click to upload or drag and drop</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>89Gb available from 150Gb</span>
          </div>
          <Progress value={60} className="w-full" />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Video
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Image
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-500 rounded-full" />
              Document
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full" />
              Installation Files
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.name} className="border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Icon size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-600">{category.files} Files</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <Tabs defaultValue="view-all" className="mb-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="view-all">View All</TabsTrigger>
                <TabsTrigger value="local-files">Local Files</TabsTrigger>
                <TabsTrigger value="shared-files">Shared Files</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input placeholder="Search..." className="pl-10 bg-gray-50 border-gray-200" />
              </div>
            </div>
            <TabsContent value="view-all">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date uploaded
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uploaded by
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {files.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img src={file.icon} alt="file icon" className="h-5 w-5" />
                            <span className="text-sm font-medium text-gray-900">{file.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.dateUploaded}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.fileSize}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.uploadedBy}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" aria-label="Delete file">
                              <Trash2 size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" aria-label="Edit file">
                              <Edit size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="w-96 border-l border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Details File</h2>
          <Button variant="ghost" size="icon" aria-label="More options">
            <MoreHorizontal size={20} />
          </Button>
        </div>

        {selectedFile ? (
          <div className="space-y-6">
            <div className="text-center">
              <img src={selectedFile.icon} alt="file icon" className="mx-auto h-16 w-16 mb-4" />
              <p className="text-lg font-semibold text-gray-900">{selectedFile.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Location</p>
              <p className="font-medium text-gray-900">Local &gt; Document &gt; Tech requirement...</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">File Name</p>
              <p className="font-medium text-gray-900">{selectedFile.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Date Uploaded</p>
              <p className="font-medium text-gray-900">{selectedFile.dateUploaded}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">File size</p>
              <p className="font-medium text-gray-900">{selectedFile.fileSize}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Share</p>
              <div className="flex -space-x-2 overflow-hidden">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">More Items</p>
              <div className="space-y-3">
                {moreItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.icon} alt="file icon" className="h-5 w-5" />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a file to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
