import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
// import { branches } from "../data/branchesData"; // <-- your 64-district data

export default function SendParcell() {

  const branches = useLoaderData();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // -----------------------
  // 1) Derive unique regions (no repeats)
  // -----------------------
  const regions = useMemo(() => {
    // branches is an array; region may repeat — we dedupe
    const set = new Set(branches.map((b) => b.region));
    return Array.from(set);
  }, []);

  // -----------------------
  // 2) For a selected region, get list of districts (as service centers)
  // -----------------------
  const senderCenters = useMemo(() => {
    if (!senderRegion) return [];
    return branches
      .filter((b) => b.region === senderRegion)
      .map((b) => ({ id: b.district, name: b.district }));
  }, [senderRegion]);

  const receiverCenters = useMemo(() => {
    if (!receiverRegion) return [];
    return branches
      .filter((b) => b.region === receiverRegion)
      .map((b) => ({ id: b.district, name: b.district }));
  }, [receiverRegion]);

  // -----------------------
  // 3) Reset service center when region changes (keeps sync)
  // -----------------------
  useEffect(() => {
    setValue("senderCenter", ""); // clear previous center when region changes
  }, [senderRegion, setValue]);

  useEffect(() => {
    setValue("receiverCenter", "");
  }, [receiverRegion, setValue]);

  // -----------------------
  // 4) Cost calc (simple example; adapt to your rules)
  // -----------------------
  const calculateCost = (data) => {
    let cost = data.parcelType === "document" ? 50 : 120; // base
    if (data.weight) cost += Number(data.weight) * 12; // per kg
    // example: if sender or receiver center is far (you can mark specific districts),
    // you can add conditional extra charge here.
    return cost;
  };

  // -----------------------
  // 5) Submit flow: show toast with cost + confirm -> save
  // -----------------------
  const onSubmit = (data) => {
    const cost = calculateCost(data);

    toast.custom(
      (t) => (
        <div className="bg-white shadow p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Delivery Cost</h3>
          <p className="mb-4">Your delivery cost is: <b>{cost} ৳</b></p>

          <div className="flex gap-2 justify-end">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                toast.dismiss(t.id);

                // save to DB here (commented example)
                // fetch('/api/parcels', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ ...data, cost, creation_date: new Date() })
                // });

                toast.success("Parcel created successfully!");
                reset();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Send a Parcel</h1>
      <p className="text-gray-500 mb-8">
        Fill out the form below to create a parcel delivery request.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ---------------- Parcel Info ---------------- */}
        <section className="p-5 border rounded-xl">
          <h2 className="text-lg font-semibold mb-4">1. Parcel Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Parcel Type *</label>
              <select
                {...register("parcelType", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.parcelType && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div>
              <label className="label">Parcel Title *</label>
              <input
                {...register("title", { required: true })}
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. Invoice, Clothes"
              />
              {errors.title && <p className="text-red-500 text-sm">Required</p>}
            </div>

            {parcelType === "non-document" && (
              <div>
                <label className="label">Weight (kg)</label>
                <input
                  {...register("weight")}
                  type="number"
                  step="0.1"
                  min="0.1"
                  className="input input-bordered w-full"
                  placeholder="e.g. 1.5"
                />
              </div>
            )}
          </div>
        </section>

        {/* ---------------- Sender Info ---------------- */}
        <section className="p-5 border rounded-xl">
          <h2 className="text-lg font-semibold mb-4">2. Sender Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Sender Name *</label>
              <input
                {...register("senderName", { required: true })}
                className="input input-bordered w-full"
                defaultValue="Your Name"
              />
              {errors.senderName && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div>
              <label className="label">Sender Contact *</label>
              <input
                {...register("senderContact", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.senderContact && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div>
              <label className="label">Select Region *</label>
              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.senderRegion && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div>
              <label className="label">Select Service Center (District) *</label>
              <select
                {...register("senderCenter", { required: true })}
                className="select select-bordered w-full"
                disabled={!senderRegion}
              >
                <option value="">Select center</option>
                {senderCenters.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.senderCenter && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div className="md:col-span-2">
              <label className="label">Sender Address *</label>
              <textarea
                {...register("senderAddress", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.senderAddress && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div className="md:col-span-2">
              <label className="label">Pick up Instruction *</label>
              <textarea
                {...register("pickupInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.pickupInstruction && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>
        </section>

        {/* ---------------- Receiver Info ---------------- */}
        <section className="p-5 border rounded-xl">
          <h2 className="text-lg font-semibold mb-4">3. Receiver Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Receiver Name *</label>
              <input
                {...register("receiverName", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.receiverName && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div>
              <label className="label">Receiver Contact *</label>
              <input
                {...register("receiverContact", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.receiverContact && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div>
              <label className="label">Select Region *</label>
              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.receiverRegion && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div>
              <label className="label">Select Service Center (District) *</label>
              <select
                {...register("receiverCenter", { required: true })}
                className="select select-bordered w-full"
                disabled={!receiverRegion}
              >
                <option value="">Select center</option>
                {receiverCenters.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.receiverCenter && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div className="md:col-span-2">
              <label className="label">Receiver Address *</label>
              <textarea
                {...register("receiverAddress", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.receiverAddress && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div className="md:col-span-2">
              <label className="label">Delivery Instruction *</label>
              <textarea
                {...register("deliveryInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.deliveryInstruction && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>
        </section>

        <div className="text-center">
          <button className="btn btn-primary px-8">Submit Parcel</button>
        </div>
      </form>
    </div>
  );
}
