import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
// import { branches } from "../data/branchesData"; // <-- your 64-district data

export default function SendParcell() {
  const branches = useLoaderData() || [];

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line react-hooks/incompatible-library
  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // আমরা এখন সেন্টার (জেলা) নাম দিয়ে চেক করব সেম সিটি কি না
  const senderCenter = watch("senderCenter");
  const receiverCenter = watch("receiverCenter");

  // -----------------------
  // 1) Derive unique regions (no repeats)
  // -----------------------
  const regions = useMemo(() => {
    // branches is an array; region may repeat — we dedupe
    const set = new Set(branches.map((b) => b.region));
    return Array.from(set);
  }, [branches]);

  // -----------------------
  // 2) For a selected region, get list of districts (as service centers)
  // -----------------------
  const senderCenters = useMemo(() => {
    if (!senderRegion) return [];
    return branches
      .filter((b) => b.region === senderRegion)
      .map((b) => ({ id: b.district, name: b.district }));
  }, [senderRegion, branches]);

  const receiverCenters = useMemo(() => {
    if (!receiverRegion) return [];
    return branches
      .filter((b) => b.region === receiverRegion)
      .map((b) => ({ id: b.district, name: b.district }));
  }, [receiverRegion, branches]);

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
    // ১. চেক করা হচ্ছে একই সিটি/জেলা কি না
    const isSameCity = data.senderCenter === data.receiverCenter;

    // ২. ওজনকে নাম্বারে কনভার্ট করা (সেফটি)
    const weight = Number(data.weight) || 0;

    // ৩. ডকুমেন্ট পার্সেল লজিক
    if (data.parcelType === "document") {
      // টেবিলে: Within City = 60, Outside = 80
      return isSameCity ? 60 : 80;
    }

    // ৪. নন-ডকুমেন্ট পার্সেল লজিক
    else {
      // বেস প্রাইস (৩ কেজি পর্যন্ত)
      // টেবিলে: Within City = 110, Outside = 150
      let basePrice = isSameCity ? 110 : 150;

      if (weight <= 3) {
        return basePrice;
      } else {
        // ৩ কেজির বেশি হলে
        const extraWeight = weight - 3;
        const pricePerKg = 40; // টেবিলে: +40/kg

        let totalCost = basePrice + extraWeight * pricePerKg;

        // টেবিলে Outside City >3kg এর ঘরে লেখা: "+40/kg +40 extra"
        // তাই ভিন্ন সিটি হলে অতিরিক্ত ৪০ টাকা যোগ করা হলো
        if (!isSameCity) {
          totalCost += 40;
        }

        return totalCost;
      }
    }
  };

  const handleFinalSubmit = async (data, cost, toastId) => {
    toast.dismiss(toastId);

    // Simulating API Call
    // try {
    //    await axios.post('/api/parcels', { ...data, cost });
    //    toast.success("Parcel created successfully!");
    //    reset();
    // } catch (err) {
    //    toast.error("Something went wrong");
    // }

    // For now:
    console.log("Saving to DB:", { ...data, cost });
    toast.success("Parcel created successfully!");
    reset();
  };

  // -----------------------
  // 5) Submit flow: show toast with cost + confirm -> save
  // -----------------------
  const onSubmit = (data) => {
    const cost = calculateCost(data);

    toast.custom(
      (t) => (
        <div className="bg-white shadow-xl border p-6 rounded-lg w-80">
          <h3 className="text-lg font-bold mb-2 text-gray-800">
            Confirm Order
          </h3>
          <p className="mb-4 text-gray-600">
            Total Cost:{" "}
            <span className="font-bold text-primary text-xl">{cost} ৳</span>
          </p>

          <div className="flex gap-3 justify-end">
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleFinalSubmit(data, cost, t.id)}
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

      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.log("Form Errors:", errors)
        )}
        className="bg-gray-300 space-y-8"
      >
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
              {errors.parcelType && (
                <p className="text-red-500 text-sm">Required</p>
              )}
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
                  {...register("weight", { valueAsNumber: true })}
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
              />
              {errors.senderName && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <label className="label">Sender Contact *</label>
              <input
                {...register("senderContact", {
                  required: true,
                })}
                className="input input-bordered w-full"
              />
              {errors.senderContact && (
                <p className="text-red-500 text-sm">Required</p>
              )}
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
              {errors.senderRegion && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <label className="label">
                Select Service Center (District) *
              </label>
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
              {errors.senderCenter && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="label">Sender Address *</label>
              <textarea
                {...register("senderAddress", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.senderAddress && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="label">Pick up Instruction *</label>
              <textarea
                {...register("pickupInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.pickupInstruction && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- Receiver Info ---------------- */}
        <section className="p-5 border rounded-xl">
          <h2 className="text-lg font-semibold mb-4">
            3. Receiver Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Receiver Name *</label>
              <input
                {...register("receiverName", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.receiverName && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <label className="label">Receiver Contact *</label>
              <input
                {...register("receiverContact", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.receiverContact && (
                <p className="text-red-500 text-sm">Required</p>
              )}
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
              {errors.receiverRegion && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <label className="label">
                Select Service Center (District) *
              </label>
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
              {errors.receiverCenter && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="label">Receiver Address *</label>
              <textarea
                {...register("receiverAddress", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.receiverAddress && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="label">Delivery Instruction *</label>
              <textarea
                {...register("deliveryInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.deliveryInstruction && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>
          </div>
        </section>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-8">
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
}
