package com.example.domain;

public class SeedVO {
	private int seed_key;
	private String seed_uid;
	private int seed_point;

	public int getSeed_key() {
		return seed_key;
	}

	public void setSeed_key(int seed_key) {
		this.seed_key = seed_key;
	}

	public String getSeed_uid() {
		return seed_uid;
	}

	public void setSeed_uid(String seed_uid) {
		this.seed_uid = seed_uid;
	}

	public int getSeed_point() {
		return seed_point;
	}

	public void setSeed_point(int seed_point) {
		this.seed_point = seed_point;
	}

	@Override
	public String toString() {
		return "SeedVO [seed_key=" + seed_key + ", seed_uid=" + seed_uid + ", seed_point=" + seed_point + "]";
	}

}
