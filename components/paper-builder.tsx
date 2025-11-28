"use client"

import React from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Paper, ACADEMIC_LEVELS, SERVICE_TYPES, PAPER_FORMATS, WORD_COUNT_MAP } from "@/lib/types"

interface PaperBuilderProps {
  papers: Paper[]
  onUpdatePapers: (papers: Paper[]) => void
  errors?: Record<string, any>
}

export default function PaperBuilder({ papers, onUpdatePapers, errors }: PaperBuilderProps) {
  const addPaper = () => {
    const newPaper: Paper = {
      id: Date.now().toString(),
      service_type: "Essay Writing",
      academic_level: "Undergraduate",
      pages: 1,
      deadline: "",
      paper_format: "Chicago",
      paper_format_other: "",
      subject: "",
      topic: "",
      topics: [],
      word_count: 250,
      instructions: "",
    }
    onUpdatePapers([...papers, newPaper])
  }

  const removePaper = (id: string) => {
    if (papers.length > 1) {
      onUpdatePapers(papers.filter((p) => p.id !== id))
    }
  }

  const updatePaper = (id: string, updates: Partial<Paper>) => {
    onUpdatePapers(
      papers.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updates,
              word_count: updates.pages
                ? (updates.pages * 250)
                : p.word_count,
            }
          : p
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Papers</h3>
        <Button
          onClick={addPaper}
          className="bg-red-600 hover:bg-red-700 text-white gap-2"
          type="button"
        >
          <Plus size={16} />
          Add Paper
        </Button>
      </div>

      {papers.map((paper, index) => (
        <div
          key={paper.id}
          className="p-6 border rounded-lg bg-gray-50 space-y-4"
        >
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-semibold text-gray-900">Paper {index + 1}</h4>
            {papers.length > 1 && (
              <button
                onClick={() => removePaper(paper.id)}
                className="text-red-600 hover:text-red-700 p-1"
                type="button"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                value={paper.service_type}
                onChange={(e) =>
                  updatePaper(paper.id, { service_type: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                {SERVICE_TYPES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors?.papers?.[paper.id]?.service_type && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.papers[paper.id].service_type}
                </p>
              )}
            </div>

            {/* Academic Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Level <span className="text-red-500">*</span>
              </label>
              <select
                value={paper.academic_level}
                onChange={(e) =>
                  updatePaper(paper.id, { academic_level: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                {ACADEMIC_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label} - £{level.price.toFixed(2)}
                  </option>
                ))}
              </select>
              {errors?.papers?.[paper.id]?.academic_level && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.papers[paper.id].academic_level}
                </p>
              )}
            </div>

            {/* Pages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Pages <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updatePaper(paper.id, {
                      pages: Math.max(1, paper.pages - 1),
                    })
                  }
                  className="bg-red-600 text-white w-8 h-8 rounded hover:bg-red-700 flex items-center justify-center"
                  type="button"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={paper.pages}
                  onChange={(e) =>
                    updatePaper(paper.id, {
                      pages: Math.max(1, parseInt(e.target.value) || 1),
                    })
                  }
                  className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-gray-900"
                />
                <button
                  onClick={() =>
                    updatePaper(paper.id, { pages: paper.pages + 1 })
                  }
                  className="bg-red-600 text-white w-8 h-8 rounded hover:bg-red-700 flex items-center justify-center"
                  type="button"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ≈ {WORD_COUNT_MAP[paper.pages] || 250} words
              </p>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={paper.deadline}
                onChange={(e) =>
                  updatePaper(paper.id, { deadline: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {errors?.papers?.[paper.id]?.deadline && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.papers[paper.id].deadline}
                </p>
              )}
            </div>

            {/* Paper Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paper Format <span className="text-red-500">*</span>
              </label>
              <select
                value={paper.paper_format}
                onChange={(e) =>
                  updatePaper(paper.id, { paper_format: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                {PAPER_FORMATS.map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {fmt}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Format (if selected) */}
            {paper.paper_format === "Other" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specify Format <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={paper.paper_format_other || ""}
                  onChange={(e) =>
                    updatePaper(paper.id, { paper_format_other: e.target.value })
                  }
                  placeholder="Enter format name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={paper.subject}
              onChange={(e) => updatePaper(paper.id, { subject: e.target.value })}
              placeholder="e.g., Biology, History, etc."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors?.papers?.[paper.id]?.subject && (
              <p className="text-sm text-red-600 mt-1">
                {errors.papers[paper.id].subject}
              </p>
            )}
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={paper.topic}
              onChange={(e) => updatePaper(paper.id, { topic: e.target.value })}
              placeholder="Main topic or research question"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors?.papers?.[paper.id]?.topic && (
              <p className="text-sm text-red-600 mt-1">
                {errors.papers[paper.id].topic}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions <span className="text-red-500">*</span>
            </label>
            <textarea
              value={paper.instructions}
              onChange={(e) =>
                updatePaper(paper.id, { instructions: e.target.value })
              }
              placeholder="Detailed instructions, requirements, additional notes..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {errors?.papers?.[paper.id]?.instructions && (
              <p className="text-sm text-red-600 mt-1">
                {errors.papers[paper.id].instructions}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
