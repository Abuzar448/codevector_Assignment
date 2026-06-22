# ScaleStream Engine 🚀

A high-performance, ultra-scalable full-stack product feed engine capable of querying and paginating through **200,000+ records** instantly. Built using the MERN stack, this project implements advanced **Cursor-Based Pagination** and **Compound Indexing** to tackle data drifting and collection scanning issues common in massive datasets.

---

## 🛠️ The Core Engineering Challenges & Solutions

### 1. Challenge: Performance Degradation with Offset Pagination (`skip`)
* **The Problem:** Traditional offset pagination (`page=3&limit=10` using `.skip(20)`) forces the database to scan and count all previous records sequentially before returning the requested slice. At 200k+ records, skipping to later pages causes significant database latency and spikes CPU utilization.
* **The Solution:** Implemented **Cursor-Based Pagination**. The API tracks a pointer—a strict unique marker consisting of a base64-encoded combination of `createdAt` and `_id` from the last item of the previous page. The database utilizes this pointer to jump directly to the target record location, keeping query lookups at $O(1)$ efficiency.

### 2. Challenge: Data Drifting (Duplicates/Skipped Records)
* **The Problem:** In high-concurrency systems (like real-time e-commerce feeds), if 50 new items are inserted into the database while a user is on Page 1, those new entries shift the existing rows downward. When the user clicks "Load More", offset pagination blindly skips a static number, forcing the user to see the same products twice.
* **The Solution:** By applying a strict relative comparison query (`createdAt < cursorTime` OR `_id < cursorId`), our engine ignores newly pushed records above the cursor point. This guarantees a perfectly consistent data stream without duplication or rendering gaps.

### 3. Challenge: Tie-Breaking on Bulk Insertion Timestamps
* **The Problem:** When bulk seeding 200,000 products, hundreds of items can share the exact same `createdAt` millisecond timestamp, making chronological pagination ambiguous.
* **The Solution:** Implemented a logical **Compound Query/Index Tie-Breaker** using a logical `$or` block:
  $$query.\$or = [ \{ createdAt: \{ \$lt: cursorTime \} \}, \{ createdAt: cursorTime, \_id: \{ \$lt: cursorId \} \} ]$$
  This fallback mechanism ensures bulletproof accuracy even if timestamps overlap perfectly.

---

## 📦 System Architecture & Stack

* **Backend:** Node.js, Express.js (Modular Controllers, Strict Route Decoupling)
* **Database:** MongoDB Atlas via Mongoose ORM
* **Database Optimization:** Active Compound Indexing on `{ category: 1, createdAt: -1, _id: -1 }`
* **Frontend:** React.js, Tailwind CSS (True Deep Black Aesthetic, Appended State Buffering)

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone [https://github.com/Abuzar448/codevector_Assignment.git](https://github.com/Abuzar448/codevector_Assignment.git)
cd codevector_Assignment