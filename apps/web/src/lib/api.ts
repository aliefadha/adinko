import { env } from "@adinko/env/web";

const api = {
	kategori: {
		list: () =>
			fetch(`${env.VITE_SERVER_URL}/api/kategori`, {
				credentials: "include",
			}).then((r) => r.json()),
		create: (data: { nama: string }) =>
			fetch(`${env.VITE_SERVER_URL}/api/kategori`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		update: (id: string, data: { nama: string }) =>
			fetch(`${env.VITE_SERVER_URL}/api/kategori/${id}`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		delete: (id: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/kategori/${id}`, {
				method: "DELETE",
				credentials: "include",
			}).then((r) => r.json()),
	},
	portfolio: {
		list: () =>
			fetch(`${env.VITE_SERVER_URL}/api/portfolio`, {
				credentials: "include",
			}).then((r) => r.json()),
		get: (id: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/portfolio/${id}`, {
				credentials: "include",
			}).then((r) => r.json()),
		create: (data: {
			kategoriId: string;
			title: string;
			subtitle?: string;
			image?: string;
			alamat?: string;
			tahun?: string;
		}) =>
			fetch(`${env.VITE_SERVER_URL}/api/portfolio`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		update: (
			id: string,
			data: {
				kategoriId?: string;
				title?: string;
				subtitle?: string;
				image?: string;
				alamat?: string;
				tahun?: string;
			},
		) =>
			fetch(`${env.VITE_SERVER_URL}/api/portfolio/${id}`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		delete: (id: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/portfolio/${id}`, {
				method: "DELETE",
				credentials: "include",
			}).then((r) => r.json()),
	},
	testimoni: {
		list: () =>
			fetch(`${env.VITE_SERVER_URL}/api/testimoni`, {
				credentials: "include",
			}).then((r) => r.json()),
		get: (id: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/testimoni/${id}`, {
				credentials: "include",
			}).then((r) => r.json()),
		create: (data: {
			kategoriId: string;
			nama: string;
			testimoni: string;
			image?: string;
		}) =>
			fetch(`${env.VITE_SERVER_URL}/api/testimoni`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		update: (
			id: string,
			data: {
				kategoriId?: string;
				nama?: string;
				testimoni?: string;
				image?: string;
			},
		) =>
			fetch(`${env.VITE_SERVER_URL}/api/testimoni/${id}`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		delete: (id: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/testimoni/${id}`, {
				method: "DELETE",
				credentials: "include",
			}).then((r) => r.json()),
	},
	layanan: {
		list: () =>
			fetch(`${env.VITE_SERVER_URL}/api/layanan`, {
				credentials: "include",
			}).then((r) => r.json()),
		get: (id: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/layanan/${id}`, {
				credentials: "include",
			}).then((r) => r.json()),
		create: (data: { title: string; image?: string }) =>
			fetch(`${env.VITE_SERVER_URL}/api/layanan`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		update: (id: string, data: { title?: string; image?: string }) =>
			fetch(`${env.VITE_SERVER_URL}/api/layanan/${id}`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		delete: (id: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/layanan/${id}`, {
				method: "DELETE",
				credentials: "include",
			}).then((r) => r.json()),
	},
	kontak: {
		get: () =>
			fetch(`${env.VITE_SERVER_URL}/api/kontak`, {
				credentials: "include",
			}).then((r) => r.json()),
		update: (data: {
			alamat?: string;
			wa?: string;
			instagram?: string;
			email?: string;
		}) =>
			fetch(`${env.VITE_SERVER_URL}/api/kontak`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
	},
	perusahaan: {
		list: () =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan`, {
				credentials: "include",
			}).then((r) => r.json()),
		get: (nama: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan/${nama}`, {
				credentials: "include",
			}).then((r) => r.json()),
		update: (
			nama: string,
			data: {
				logo?: string;
				title?: string;
				subtitle?: string;
				visi?: string;
				misi?: string;
			},
		) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan/${nama}`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
	},
	perusahaanImage: {
		list: (perusahaanId: string) =>
			fetch(
				`${env.VITE_SERVER_URL}/api/perusahaan-image?perusahaanId=${perusahaanId}`,
				{ credentials: "include" },
			).then((r) => r.json()),
		create: (data: { perusahaanId: string; image: string }) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-image`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		update: (id: string, data: { image: string }) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-image/${id}`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		delete: (id: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-image/${id}`, {
				method: "DELETE",
				credentials: "include",
			}).then((r) => r.json()),
	},
	perusahaanTag: {
		list: (perusahaanId: string) =>
			fetch(
				`${env.VITE_SERVER_URL}/api/perusahaan-tag?perusahaanId=${perusahaanId}`,
				{ credentials: "include" },
			).then((r) => r.json()),
		create: (data: { perusahaanId: string; tag: string }) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-tag`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		update: (id: string, data: { tag: string }) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-tag/${id}`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		delete: (id: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-tag/${id}`, {
				method: "DELETE",
				credentials: "include",
			}).then((r) => r.json()),
	},
	perusahaanAlasan: {
		list: (perusahaanId: string) =>
			fetch(
				`${env.VITE_SERVER_URL}/api/perusahaan-alasan?perusahaanId=${perusahaanId}`,
				{ credentials: "include" },
			).then((r) => r.json()),
		create: (data: {
			perusahaanId: string;
			icon: string;
			alasan: string;
			sortOrder?: number;
		}) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-alasan`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		update: (
			id: string,
			data: { icon?: string; alasan?: string; sortOrder?: number },
		) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-alasan/${id}`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		delete: (id: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-alasan/${id}`, {
				method: "DELETE",
				credentials: "include",
			}).then((r) => r.json()),
	},
	perusahaanLayanan: {
		list: (perusahaanId: string) =>
			fetch(
				`${env.VITE_SERVER_URL}/api/perusahaan-layanan?perusahaanId=${perusahaanId}`,
				{ credentials: "include" },
			).then((r) => r.json()),
		create: (data: {
			perusahaanId: string;
			title: string;
			subtitle?: string;
			image?: string;
			namaLayanan: string;
		}) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-layanan`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		update: (
			id: string,
			data: {
				title?: string;
				subtitle?: string;
				image?: string;
				namaLayanan?: string;
			},
		) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-layanan/${id}`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}).then((r) => r.json()),
		delete: (id: string) =>
			fetch(`${env.VITE_SERVER_URL}/api/perusahaan-layanan/${id}`, {
				method: "DELETE",
				credentials: "include",
			}).then((r) => r.json()),
	},
	upload: {
		uploadFile: async (
			file: File,
			entity:
				| "portfolio"
				| "layanan"
				| "testimoni"
				| "perusahaan-image"
				| "perusahaan-layanan",
		) => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("entity", entity);

			const response = await fetch(`${env.VITE_SERVER_URL}/api/upload/file`, {
				method: "POST",
				credentials: "include",
				body: formData,
			});

			const result = await response.json();
			if (!result.data?.publicUrl) {
				throw new Error("Failed to upload file");
			}
			return result.data.publicUrl;
		},
	},
};

export { api };
