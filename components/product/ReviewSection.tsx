"use client";

import { useReviewStore, useAuthStore } from "@/store";
import { Star, Send, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  productId: number;
}

export default function ReviewSection({ productId }: Props) {
  const { reviews, addReview, getReviews } = useReviewStore();
  const { user, isAuthenticated } = useAuthStore();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const productReviews = getReviews(productId);
  const avgRating = productReviews.length
    ? productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length
    : 0;

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to write a review");
      return;
    }
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write your review");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    addReview({
      id: Date.now().toString(),
      productId,
      author: `${user?.name?.firstname} ${user?.name?.lastname}`,
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    });
    toast.success("Review submitted! Thank you.");
    setRating(0);
    setComment("");
    setSubmitting(false);
  };

  return (
    <div className="border-t border-gray-100 pt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-gray-900">Customer Reviews</h2>
        {productReviews.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={
                    s <= Math.round(avgRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-bold">{avgRating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">
              ({productReviews.length})
            </span>
          </div>
        )}
      </div>

      {/* Write Review */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Write a Review</h3>
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setRating(s)}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
            >
              <Star
                size={22}
                className={`transition-colors ${s <= (hovered || rating) ? "fill-amber-400 text-amber-400" : "text-gray-300 fill-gray-100"}`}
              />
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={
            isAuthenticated
              ? "Share your experience with this product..."
              : "Login to write a review"
          }
          disabled={!isAuthenticated}
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#970747] resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmit}
            disabled={submitting || !isAuthenticated}
            className="flex items-center gap-2 bg-[#970747] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#7a0538] transition-colors disabled:opacity-50"
          >
            <Send size={13} /> {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>

      {/* Reviews List */}
      {productReviews.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">
          No reviews yet. Be the first to review!
        </p>
      ) : (
        <div className="space-y-4">
          {productReviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#970747]/10 rounded-full flex items-center justify-center">
                    <User size={14} className="text-[#970747]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      {r.author}
                    </p>
                    <p className="text-[10px] text-gray-400">{r.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={11}
                      className={
                        s <= r.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200 fill-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {r.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
