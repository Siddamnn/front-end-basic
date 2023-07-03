async function main(){
    const [deployer]=await ethers.getSigners();
    console.log("Deploying contract using account:", deployer.address);

    const bank= await ethers.deployContract("Bank");
    console.log("Contract address:",await bank.getAddress());


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });