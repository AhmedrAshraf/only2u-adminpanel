import React from "react";

function page() {
  const productDummyData = [
    {
      id: 1,
      product_images: "https://picsum.photos/400/500?random=1",
      product_videos:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      product_name: "Elegant Evening Dress",
      category: "Night wear",
      featured_type: "Trending Now",
      available_colors: ["black", "blue", "pink"],
    },
    {
      id: 2,
      product_images: "https://picsum.photos/400/500?random=2",
      product_videos: "", // Optional field - empty string
      product_name: "Traditional Summer Lehenga",
      category: "Lehengas",
      featured_type: "Best Sellers",
      available_colors: ["pink", "blue"],
    },
    {
      id: 3,
      product_images: "https://picsum.photos/400/500?random=3",
      product_videos:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      product_name: "Casual Cotton 3PC Set",
      category: "3pc set",
      featured_type: "None",
      available_colors: ["black", "pink"],
    },
    {
      id: 4,
      product_images: "https://picsum.photos/400/500?random=4",
      product_videos:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      product_name: "Luxury Silk Pajama Set",
      category: "Night wear",
      featured_type: "Best Sellers",
      available_colors: ["black", "blue", "pink"],
    },
    {
      id: 5,
      product_images: "https://picsum.photos/400/500?random=5",
      product_videos: "", // Optional field - empty string
      product_name: "Royal Bridal Lehenga",
      category: "Lehengas",
      featured_type: "Trending Now",
      available_colors: ["pink", "blue"],
    },
  ];

  return (
    <div className="">
      <table>
        <thead className="border-b-2 border-amber-400">
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Video</th>
            <th>Category</th>
            <th>Featured Type</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {productDummyData.map((data, index) => (
            <tr key={data.id} className="my-10">
              <td>{data?.product_name}</td>
              <td>
                {data.product_images ? (
                  <a
                    href={data.product_images}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center my-5"
                  >
                    <img
                      src={data.product_images}
                      alt={data.product_name}
                      className="w-[25%]"
                    />
                  </a>
                ) : (
                  <h1>N/A</h1>
                )}
              </td>
              <td>
                {data.product_videos ? (
                  <div className="bg-yellow-400 text-white rounded-xl p-2 flex justify-center">
                    <a
                      href={data.product_videos}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      See Video
                    </a>
                  </div>
                ) : (
                  <h1 className="text-center">N/A</h1>
                )}
              </td>
              <td>
                <div className="mx-10">{data.category}</div>
              </td>
              <td>{data.featured_type ? data.featured_type : "N/A"}</td>
              <td>
                <div className="flex">
                  {data.available_colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-10 h-10 mx-2 rounded-full"
                      style={{ backgroundColor: color }}
                      title={color}
                      aria-label={`Color: ${color}`}
                    ></div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page;
